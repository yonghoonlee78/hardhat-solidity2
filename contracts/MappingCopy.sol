// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MappingCopy {
    mapping(address => uint256) private balances;

    function setBalance(address _addr, uint256 _amount) external {
        balances[_addr] = _amount;
    }

    function getBalance(address _addr) external view returns (uint256) {
        return balances[_addr];
    }
}
