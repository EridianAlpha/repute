// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {Script, console} from "lib/forge-std/src/Script.sol";
import {Repute} from "src/Repute.sol";

contract Deploy is Script {
    function run() public returns (address deployedReputeAddress) {
        vm.startBroadcast(msg.sender);
        deployedReputeAddress = address(new Repute());
        vm.stopBroadcast();
    }
}
