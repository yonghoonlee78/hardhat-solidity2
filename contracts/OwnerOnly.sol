// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OwnerOnly {
    address public owner;
    uint256 public value; // ✅ 추가

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function setValue(uint256 _v) public onlyOwner { // ✅ 추가
        value = _v;
    }
}
