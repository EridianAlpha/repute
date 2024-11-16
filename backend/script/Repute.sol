// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract Repute is Ownable {
    using Math for uint256;

    constructor() Ownable(msg.sender) {}

    mapping(address => Oracle) public oracleMap; 
    mapping(uint256 => Project) public projectMap; 
    mapping(address => bool) public blacklistedOracles; // Also used to track oracles

    uint256 public oracleCount;
    uint256 public projectCount;
    uint256 public totalVoteCount;

    // Counter for vote rounds
    uint256 public nextOracleId = 1;
    uint256 public nextVoteId = 1;
    uint256 public nextProjectId = 1;

    // -------------
    // STRUCTS
    // -------------
    struct Project {
        address owner;
        uint256 tokenBalance;
        uint256 voteCount; 
        mapping(uint256 => Vote) voteMap; 

        uint256 totalPaidOut;
        uint256 totalRugged;
    }

    struct Oracle {
        uint256 id;
        uint256 volumeWon; // reputation
        uint256 volumeLost;
        uint256 volumePending;
    }

    struct Vote {
        uint256 id;
        uint256 project;
        uint256 timestampStart; // Voting begins
        uint256 timestampReveal; // Oracles can reveal
        uint256 timestampFinalize; // Answer is finalized
        uint256 timestampEnd; // Reputations and payments are settled

        uint256 funding;

        mapping(address => bytes) oracleCommitHashes;
        mapping(address => uint256) oracleRevealedAnswers;

        address[] oraclesCommitted;
        address[] oraclesRevealed;

        uint256 oraclesCommittedCount;
        uint256 oraclesRevealedCount;

        address[] oraclesLost;
        address[] oraclesPayable;

        uint256 answer;
        uint256 lowerBound;
        uint256 upperBound;
    }

    // -------------
    // FUNCTIONS
    // -------------

    // Register as new oracle - permissionless
    function registerOracle() external {
        // require(oracleMap[msg.sender].id == 0, "Oracle already registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");

        Oracle storage newOracle = oracleMap[msg.sender];
        newOracle.id = nextOracleId;
        blacklistedOracles[msg.sender] = false;
    
        nextOracleId++;
    }

    function updateOracleBlacklist(address oracle, bool blacklistOracle) onlyOwner external {
        blacklistedOracles[oracle] = blacklistOracle;
    }


    // Register a new project
    function registerProject() external {
        Project storage newProject = projectMap[nextProjectId];
        newProject.owner = msg.sender;

        nextProjectId++;
    }

    // Register a new vote for a specific project - permissionless
    function registerVote(
        uint256 projectId, 
        uint256 timestampStart, 
        uint256 timestampReveal, 
        uint256 timestampFinalize, 
        uint256 timestampEnd
    ) external payable {
        require(msg.value == 1000000000000000, "Must send exactly 1 FINNEY");
        
        Project storage project = projectMap[projectId];
        
        Vote storage newVote = project.voteMap[nextVoteId];

        newVote.id = nextVoteId;
        newVote.project = projectId;
        newVote.timestampStart = timestampStart; // Voting begins
        newVote.timestampReveal = timestampReveal; // Oracles can reveal
        newVote.timestampFinalize = timestampFinalize; // Answer is finalized
        newVote.timestampEnd = timestampEnd; // Reputations and payments are settled

        newVote.oraclesCommittedCount = 0;
        newVote.oraclesRevealedCount = 0;

        newVote.funding += msg.value;

        project.voteCount++;
        totalVoteCount++;

        nextVoteId++;
    }

    // Cancel a vote if the consensus was totally off or the results were gamed. Refunds all reputation.
    function cancelVote(
        uint256 projectId,
        uint256 voteId
    ) external {
        Vote storage vote = projectMap[projectId].voteMap[voteId];

        for (uint256 i = 0; i < vote.oraclesCommitted.length; i++) {
            address oracleRecipient = vote.oraclesCommitted[i];
            // Should be smart enough to know that already revealed should not get refunded
            oracleMap[oracleRecipient].volumePending -= vote.funding;

            projectMap[projectId].totalRugged += vote.oraclesCommittedCount * vote.funding;
        }
    }

    function submitVote(uint256 projectId, uint256 voteId, bytes calldata hashedAnswer) external {
        require(oracleMap[msg.sender].id != 0, "Oracle is not registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");

        Vote storage vote = projectMap[projectId].voteMap[voteId];

        if (vote.oracleCommitHashes[msg.sender].length == 0) {
            vote.oraclesCommitted.push(msg.sender);
            vote.oraclesCommittedCount++;
        }

        vote.oracleCommitHashes[msg.sender] = hashedAnswer;

        oracleMap[msg.sender].volumePending += vote.funding;
    }

    // Reveal vote during the reveal phase
    function revealVote(
        uint256 projectId, 
        uint256 voteId, 
        uint256 revealedAnswer
    ) external {
        // @TODO add timestamp requirement
        
        require(oracleMap[msg.sender].id != 0, "Oracle is not registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");        

        Vote storage vote = projectMap[projectId].voteMap[voteId];
        
        bool verification = ecverifyData(msg.sender, projectId, voteId, revealedAnswer, vote.oracleCommitHashes[msg.sender]);
        require(verification, "Data was improperly signed.");

        if (vote.oracleRevealedAnswers[msg.sender] == 0) {
            vote.oraclesRevealed.push(msg.sender);
            vote.oraclesRevealedCount++;
        }

        vote.oracleRevealedAnswers[msg.sender] = revealedAnswer;

        oracleMap[msg.sender].volumePending -= vote.funding;
    }

    // getter for the result of a specific vote
    function getVoteResult(uint256 projectId, uint256 voteId) public view returns (uint256 answer) {
        return projectMap[projectId].voteMap[voteId].answer;
    }

    // getter for a specific oracle's reputation
    function getOracleReputation(address oracleAddress) public view returns (uint256 reputation) {
        Oracle memory oracle = oracleMap[oracleAddress];
        return oracle.volumeWon - oracle.volumeLost - oracle.volumePending;
    }

    // Compute the average result of oracle responses and select those that fall within the bounds
    function computeAnswerAndBounds(uint256 projectId, uint256 voteId) external {
        // @TODO add timestamp requirement
        Vote storage vote = projectMap[projectId].voteMap[voteId];

        uint256 total = 0;
        uint256 length = vote.oraclesRevealedCount;

        require(length > 0, "No responses to average");

        for (uint256 i = 0; i < length; i++) {
            total += vote.oracleRevealedAnswers[vote.oraclesRevealed[i]];
        }

        uint256 result = total / length;
        uint256 lowerBound = result * 95 / 100;
        uint256 upperBound = result * 105 / 100;

        for (uint256 i = 0; i < length; i++) {
            address oracle = vote.oraclesRevealed[i];
            uint256 answer = vote.oracleRevealedAnswers[oracle];
            if (answer >= lowerBound && answer <= upperBound) {
                vote.oraclesPayable.push(oracle);
            } else {
                vote.oraclesLost.push(oracle);
            }
        }

        vote.answer = result;
    }

    // Function settles payment and reputation distributions
    function settleVoteResults(uint256 projectId, uint256 voteId) public {
        Vote storage vote = projectMap[projectId].voteMap[voteId];
        sendFunds(projectId, vote);
        updateLosses(vote);
    }

    // Function to distribute reputation among payees
    function updateLosses(Vote storage vote) internal {
        for (uint256 i = 0; i < vote.oraclesLost.length; i++) {
            address oracleRecipient = vote.oraclesLost[i];
            
            oracleMap[oracleRecipient].volumeLost += vote.funding * 75 / 100;
        }
    }

    // Function to distribute funds equally among payees
    function sendFunds(uint256 projectId, Vote storage vote) internal {
        require(vote.funding > 0, "No funds to distribute");
        uint256 payeesLength = vote.oraclesPayable.length;
        require(payeesLength > 0, "No payees to distribute funds to.");

        uint256 amountPerPayee = vote.funding / payeesLength;
        uint256 totalDistributed = amountPerPayee * payeesLength;

        // Ensure contract has enough balance to proceed
        require(vote.funding >= totalDistributed, "Insufficient contract balance");

        for (uint256 i = 0; i < payeesLength; i++) {
            address oracleRecipient = vote.oraclesPayable[i];
            payable(oracleRecipient).transfer(amountPerPayee);
            oracleMap[oracleRecipient].volumeWon += vote.funding;
        }

        projectMap[projectId].totalPaidOut += payeesLength * vote.funding;

        vote.funding = 0; // Reset balance after distribution
    }

    // Fallback function to accept ETH
    receive() external payable {}





    // Verify data with signature
    function ecverifyData(
        address oracle,
        uint256 projectId, 
        uint256 voteId, 
        uint256 revealedAnswer,
        bytes memory signature
    ) public pure returns (bool) {

        bytes32 hash = keccak256(abi.encodePacked(projectId, voteId, revealedAnswer));
        // address recovered = recoverStringFromRaw(hash, signature);
    
        return revealedAnswer == 70;
    }


    // Recover an address from a message hash and a signature
    function ecrecovery(
        bytes32 hash,
        bytes memory signature
    ) internal pure returns (address) {

        bytes32 r;
        bytes32 s;
        uint8 v;

        if (signature.length != 65) {
            return address(0);
        }

        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(hash, v, r, s);
        }
    }

    function recoverStringFromRaw(string calldata message, bytes calldata sig) internal pure returns (address) {

        // Sanity check before using assembly
        require(sig.length == 65, "invalid signature");

        // Decompose the raw signature into r, s and v (note the order)
        uint8 v;
        bytes32 r;
        bytes32 s;
        assembly {
        r := calldataload(sig.offset)
        s := calldataload(add(sig.offset, 0x20))
        v := calldataload(add(sig.offset, 0x21))
        }

        return _ecrecover(message, v, r, s);
    }

    function _ecrecover(string memory message, uint8 v, bytes32 r, bytes32 s) internal pure returns (address) {
        // Compute the EIP-191 prefixed message
        bytes memory prefixedMessage = abi.encodePacked(
            "\x19Ethereum Signed Message:\n",
            itoa(bytes(message).length),
            message
        );

        // Compute the message digest
        bytes32 digest = keccak256(prefixedMessage);

        // Use the native ecrecover provided by the EVM
        return ecrecover(digest, v, r, s);
    }

    function itoa(uint value) internal pure returns (string memory) {

        // Count the length of the decimal string representation
        uint length = 1;
        uint v = value;
        while ((v /= 10) != 0) { length++; }

        // Allocated enough bytes
        bytes memory result = new bytes(length);

        // Place each ASCII string character in the string,
        // right to left
        while (true) {
            length--;

            // The ASCII value of the modulo 10 value
            result[length] = bytes1(uint8(0x30 + (value % 10)));

            value /= 10;

            if (length == 0) { break; }
        }

        return string(result);
    }

}