// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {Deploy} from "script/Deploy.s.sol";

import {Repute} from "src/Repute.sol";

contract ReputeTest is Test {
    Repute public repute;

    // Create users
    address defaultFoundryCaller = address(uint160(uint256(keccak256("foundry default caller"))));
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");

    // Setup testing constants
    uint256 internal constant STARTING_BALANCE = 10 ether;
    uint256 internal constant SEND_VALUE = 1 ether;

    function setUp() external {
        // Deploy contract
        Deploy deploy = new Deploy();
        (address reputeAddress) = deploy.run();

        repute = Repute(reputeAddress);

        // Give all the users a starting balance of ETH
        vm.deal(user1, STARTING_BALANCE);
        vm.deal(user2, STARTING_BALANCE);
    }

    function test_DeploymentTest() external view {
        assertTrue(address(repute) != address(0), "Repute contract should be deployed");
    }
}
