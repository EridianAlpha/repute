// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Repute is Ownable {

    constructor() Ownable(msg.sender) {}

    mapping(address => Oracle) public oracleMap; 
    mapping(uint256 => Project) public projectMap; 
    mapping(address => bool) public blacklistedOracles; // Also used to track oracles

    uint256 public oracleCount;
    uint256 public projectCount;
    uint256 public voteCount;

    // Counter for vote rounds
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

        mapping(address => bytes32) oracleCommitHash;
        mapping(address => uint256) oracleRevealedAnswer;

        uint256 answer;
    }

    // Register as new oracle
    function registerOracle() external {
        require(!blacklistedOracles[msg.sender], "Oracle already registered");
        require(blacklistedOracles[msg.sender] != true, "Oracle is blacklisted");

        oracleMap[msg.sender] = Oracle(0, 0, 0);

        blacklistedOracles[msg.sender] = false;
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

    // Update existing project
    function updateProject(uint256 projectId) external {
        require(projectMap[projectId].owner == msg.sender, "You are not the project owner.");

        // TODO
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

        nextVoteId++;
    }
}