require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const contracts = [
    "VisibilityTest",
    "FunctionExample",
    "ControlFlow",
    "EventLogger",
    "OwnerOnly",
    "ErrorChecker",
    "EtherWallet",
  ];

  const deployedAddresses = {};

  for (const name of contracts) {
    const Factory  = await hre.ethers.getContractFactory(name);
    const instance = await Factory.deploy();
    await instance.waitForDeployment();           

    const address  = await instance.getAddress(); 
    deployedAddresses[name] = address;

    console.log(`${name} deployed → ${address}`);
  }

  console.log("\n📜  All deployed addresses:");
  console.log(JSON.stringify(deployedAddresses, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

