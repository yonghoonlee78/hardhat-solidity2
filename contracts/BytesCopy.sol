// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BytesCopy {
    bytes private data;

    function setData(bytes calldata _data) external {
        data = _data;
    }

    function getData() external view returns (bytes memory) {
        return data;
    }
}
