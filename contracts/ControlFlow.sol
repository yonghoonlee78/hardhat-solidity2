// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ControlFlow {
    function sumUpTo(uint n) public pure returns (uint) {
        uint sum = 0;
        for (uint i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }

    function isEven(uint number) public pure returns (bool) {
        if (number % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }
}
