const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MappingCopy", function () {
  let copy, user;

  beforeEach(async () => {
    [user] = await ethers.getSigners();
    const MappingCopy = await ethers.getContractFactory("MappingCopy");
    copy = await MappingCopy.deploy();
  });

  it("sets and gets balances", async () => {
    await copy.setBalance(user.address, 1000);
    expect(await copy.getBalance(user.address)).to.equal(1000);
  });
});
