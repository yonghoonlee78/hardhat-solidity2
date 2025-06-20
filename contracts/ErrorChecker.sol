// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ErrorChecker {
    function divide(uint a, uint b) public pure returns (uint) {
        require(b != 0, "Cannot divide by zero");
        return a / b;
    }
}
