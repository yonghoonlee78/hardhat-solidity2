const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StringCopy", function () {
  let copy;

  beforeEach(async () => {
    const StringCopy = await ethers.getContractFactory("StringCopy");
    copy = await StringCopy.deploy(); // ⬅️ 이 줄만 있으면 충분
  });

  it("stores and returns a string", async () => {
    const sample = "Hello Copy!";
    await copy.setString(sample);
    expect(await copy.getString()).to.equal(sample);
  });
});
