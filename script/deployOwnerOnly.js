// script/deployOwnerOnly.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying OwnerOnly with:", deployer.address);

  const Factory  = await hre.ethers.getContractFactory("OwnerOnly");
  const instance = await Factory.deploy();
  await instance.waitForDeployment();

  const address  = await instance.getAddress();
  console.log("✅ New OwnerOnly deployed →", address);

  // (선택) Etherscan 자동 검증
  if (process.env.ETHERSCAN_API_KEY) {
    try {
      await hre.run("verify:verify", { address, constructorArguments: [] });
      console.log("✔️  Verified on Etherscan");
    } catch (err) {
      console.warn("Verification skipped/failed:", err.message);
    }
  }
}

main().catch(console.error);
