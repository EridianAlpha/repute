// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {Deploy} from "script/Deploy.s.sol";

import {Repute} from "src/Repute.sol";

contract TestSetup is Test {
    // Added to remove this whole testing file from coverage report.
    function test() public {}

    Repute repute;

    // Create users
    address defaultFoundryCaller = address(uint160(uint256(keccak256("foundry default caller"))));
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");

    function setUp() external {
        // Deploy contract
        Deploy deploy = new Deploy();
        (address reputeAddress) = deploy.run();

        repute = Repute(reputeAddress);

        // Give all the users a starting balance of ETH
        vm.deal(user1, STARTING_BALANCE);
        vm.deal(user2, STARTING_BALANCE);
    }
}
