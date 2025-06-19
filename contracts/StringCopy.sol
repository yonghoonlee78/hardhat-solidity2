// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StringCopy {
    string private value;

    function setString(string calldata _value) external {
        value = _value;
    }

    function getString() external view returns (string memory) {
        return value;
    }
}
