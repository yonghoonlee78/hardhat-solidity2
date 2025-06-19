// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StructCopy {
    struct Person {
        string name;
        uint256 age;
    }

    mapping(uint256 => Person) private people;
    uint256 private peopleCount;

    function addPerson(string calldata _name, uint256 _age) external returns (uint256 id) {
        id = peopleCount++;
        people[id] = Person({name: _name, age: _age});
    }

    function getPerson(uint256 id) external view returns (string memory name, uint256 age) {
        Person storage p = people[id];
        return (p.name, p.age);
    }
}
