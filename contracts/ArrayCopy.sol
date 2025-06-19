// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArrayCopy {
    uint256[] private numbers;

    function pushNumber(uint256 _num) external {
        numbers.push(_num);
    }

    function getNumbers() external view returns (uint256[] memory) {
        return numbers;
    }

    function getNumber(uint256 index) external view returns (uint256) {
        require(index < numbers.length, "Index out of bounds");
        return numbers[index];
    }
}
