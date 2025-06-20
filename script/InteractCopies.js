require("dotenv").config();
const hre = require("hardhat");
const { toUtf8Bytes } = require("ethers");

const addresses = {
  StringCopy: "0x4c571f5d4EF9c8278547C4Ab07356C723D127808",
  ArrayCopy: "0xc4b9D9DDCc24417afe19F2710506cee649334Fb2",
  MappingCopy: "0xE20B5F929bf408990D9a69aB75AeF68fd0C20e2F",
  StructCopy: "0xeA6Ab6aAcF3d8A20FCB356B29E694740f160d017",
  BytesCopy: "0xE550128EB0B0FA9AA19d1FCeAb03A6c9fae866e5",
};

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Using signer:", signer.address);

  const StringCopy = await hre.ethers.getContractAt("StringCopy", addresses.StringCopy, signer);
  await (await StringCopy.setString("Hello, Etherscan!"))?.wait();
  console.log("StringCopy greeting →", await StringCopy.getString());

  const ArrayCopy = await hre.ethers.getContractAt("ArrayCopy", addresses.ArrayCopy, signer);
  await (await ArrayCopy.pushNumber(77))?.wait();
  console.log("ArrayCopy numbers →", await ArrayCopy.getNumbers());

  const MappingCopy = await hre.ethers.getContractAt("MappingCopy", addresses.MappingCopy, signer);
  await (await MappingCopy.setBalance(signer.address, 8888))?.wait();
  console.log("MappingCopy balance →", await MappingCopy.getBalance(signer.address));

  const StructCopy = await hre.ethers.getContractAt("StructCopy", addresses.StructCopy, signer);
  const tx = await StructCopy.addPerson("LYH", 99);
  const receipt = await tx.wait();
  const id = receipt.events?.[0]?.args?.id ?? 0n;
  const person = await StructCopy.getPerson(id);
  console.log(`StructCopy person #${id} →`, person);

  const BytesCopy = await hre.ethers.getContractAt("BytesCopy", addresses.BytesCopy, signer);
  const payload = toUtf8Bytes("KaiaTest");
  await (await BytesCopy.setData(payload))?.wait();
  console.log("BytesCopy stored →", await BytesCopy.getData());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
