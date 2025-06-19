const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StructCopy", function () {
  let copy;

  beforeEach(async () => {
    const StructCopy = await ethers.getContractFactory("StructCopy");
    copy = await StructCopy.deploy();
  });

  it("adds a person and retrieves them", async () => {
    const tx = await copy.addPerson("Bob", 45);
    const receipt = await tx.wait();
    const id = receipt.events?.[0]?.args?.id ?? 0;

    const [name, age] = await copy.getPerson(id);
    expect(name).to.equal("Bob");
    expect(age).to.equal(45);
  });
});
