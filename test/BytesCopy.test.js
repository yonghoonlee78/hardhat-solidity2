const { expect } = require("chai");
const { ethers } = require("hardhat");      
const { toUtf8Bytes, hexlify } = require("ethers"); 

describe("BytesCopy", function () {
  let copy;

  beforeEach(async () => {
    const BytesCopy = await ethers.getContractFactory("BytesCopy");
    copy = await BytesCopy.deploy();
  });

  it("stores and returns bytes", async () => {
    const bytesInput = toUtf8Bytes("Kaia");
    await copy.setData(bytesInput);
    expect(await copy.getData()).to.equal(hexlify(bytesInput));
  });
});
