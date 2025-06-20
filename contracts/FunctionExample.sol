// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FunctionExample {
    uint public count;

    function increment() public {
        count++;
    }

    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
