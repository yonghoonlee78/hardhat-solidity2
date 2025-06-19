const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArrayCopy", function () {
  let copy;

  beforeEach(async () => {
    const ArrayCopy = await ethers.getContractFactory("ArrayCopy");
    copy = await ArrayCopy.deploy();
  });

  it("pushes values and returns them", async () => {
    await copy.pushNumber(10);
    await copy.pushNumber(20);
    expect(await copy.getNumbers()).to.deep.equal([10, 20]);
    expect(await copy.getNumber(1)).to.equal(20);
  });

  it("reverts on out-of-bounds access", async () => {
    await expect(copy.getNumber(99)).to.be.revertedWith("Index out of bounds");
  });
});
