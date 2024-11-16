// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

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

        mapping(address => bytes) oracleCommitHashes;
        mapping(address => uint256) oracleRevealedAnswers;

        address[] oraclesCommitted;
        address[] oraclesRevealed;

        uint256 oracleCommits;
        uint256 oracleReveals;

        uint256 answer;
    }

    // Register as new oracle
    function registerOracle() external {
        require(oracleMap[msg.sender].id == 0, "Oracle already registered");
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

    // Register a new oracle
    function registerVote(uint256 projectId, uint256 timestampStart, uint256 timestampReveal, uint256 timestampFinalize, uint256 timestampEnd) external {
        Project storage project = projectMap[projectId];
        
        Vote storage newVote = project.voteMap[nextVoteId];

        newVote.id = nextVoteId;
        newVote.project = projectId;
        newVote.timestampStart = timestampStart; // Voting begins
        newVote.timestampReveal = timestampReveal; // Oracles can reveal
        newVote.timestampFinalize = timestampFinalize; // Answer is finalized
        newVote.timestampEnd = timestampEnd; // Reputations and payments are settled

        project.voteCount++;
        totalVoteCount++;

        nextVoteId++;
    }

    function submitVote(uint256 projectId, uint256 voteId, bytes calldata hashedAnswer) external {
        require(oracleMap[msg.sender].id != 0, "Oracle is not registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");

        Vote storage vote = projectMap[projectId].voteMap[voteId];

        if (vote.oracleCommitHashes[msg.sender].length == 0) {
            vote.oraclesCommitted.push(msg.sender);
            vote.oracleCommits++;
        }

        vote.oracleCommitHashes[msg.sender] = hashedAnswer;
    }

    function revealVote(
        uint256 projectId, 
        uint256 voteId, 
        uint256 timestamp, 
        uint256 revealedAnswer
    ) external {
        // @TODO add timestamp requirement
        
        require(oracleMap[msg.sender].id != 0, "Oracle is not registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");        

        Vote storage vote = projectMap[projectId].voteMap[voteId];
        
        bool verification = ecverifyData(msg.sender, projectId, voteId, timestamp, revealedAnswer, vote.oracleCommitHashes[msg.sender]);
        require(verification, "Data was improperly signed.");

        if (vote.oracleRevealedAnswers[msg.sender] == 0) {
            vote.oraclesRevealed.push(msg.sender);
            vote.oracleReveals++;
        }

        vote.oracleRevealedAnswers[msg.sender] = revealedAnswer;
    }

    function computeAnswer(uint256 projectId, uint256 voteId) external {
        // @TODO add timestamp requirement
        Vote storage vote = projectMap[projectId].voteMap[voteId];

        uint256 total = 0;
        uint256 length = vote.oraclesCommitted.length;

        require(length > 0, "No responses to average");

        for (uint256 i = 0; i < length; i++) {
            total += vote.oracleRevealedAnswers[vote.oraclesCommitted[i]];
        }

        vote.answer = total / length; 
    }

    function getAnswer(uint256 projectId, uint256 voteId) public view returns (uint256 answer) {
        return projectMap[projectId].voteMap[voteId].answer;
    }





    // Verify data with signature
    function ecverifyData(
        address oracle,
        uint256 projectId, 
        uint256 voteId, 
        uint256 timestamp,  
        uint256 revealedAnswer,
        bytes memory hashedAnswer        
    ) public pure returns (bool) {

        bytes32 hash = keccak256(abi.encodePacked(projectId, voteId, timestamp, revealedAnswer));
        address recovered = ecrecovery(hash, hashedAnswer);
    
        return oracle == recovered;
    }

    // Recover an address from a message hash and a signature
    function ecrecovery(
        bytes32 hash,
        bytes memory signature
    ) private pure returns (address) {

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
}