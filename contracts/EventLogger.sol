// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EventLogger {
    event Log(string message, uint timestamp);

    function writeLog(string memory message) public {
        emit Log(message, block.timestamp);
    }
}
