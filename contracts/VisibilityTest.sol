// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VisibilityTest {
    uint private x = 100;
    uint internal y = 200;
    uint public z = 300;

    function getX() private view returns (uint) {
        return x;
    }

    function getY() internal view returns (uint) {
        return y;
    }

    function getZ() external view returns (uint) {
        return z;
    }
}
