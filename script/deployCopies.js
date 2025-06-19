/*
 * script/deployCopies.js
 *
 * Deploys the five Copy contracts to Sepolia (or any configured network) **and**
 * waits for 5 confirmations before verifying each one on Etherscan.
 *
 * Usage:
 *   npx hardhat run script/deployCopies.js --network sepolia
 */

const hre = require("hardhat");

/**
 * Deploy a contract and return its address.
 * Waits for <confirmations> blocks before returning so the bytecode is visible
 * to the explorer, avoiding the "does not have bytecode" verification error.
 */
async function deploy(name, confirmations = 5) {
  const Factory = await hre.ethers.getContractFactory(name);
  const instance = await Factory.deploy();

  // Wait until the transaction is mined AND <confirmations> blocks deep
  const receipt = await instance
    .deploymentTransaction()
    .wait(confirmations);

  console.log(
    `${name} deployed → ${instance.target} (tx: ${receipt.hash}, blocks waited: ${confirmations})`
  );

  return instance.target;
}

async function main() {
  const deployments = {};
  const contracts = [
    "StringCopy",
    "ArrayCopy",
    "MappingCopy",
    "StructCopy",
    "BytesCopy",
  ];

  for (const c of contracts) {
    deployments[c] = await deploy(c);
  }

  console.log("\n📜  Deployed addresses:\n" + JSON.stringify(deployments, null, 2));

  if (process.env.ETHERSCAN_API_KEY) {
    for (const [name, address] of Object.entries(deployments)) {
      console.log(`\n🔍  Verifying ${name}…`);
      try {
        await hre.run("verify:verify", {
          address,
          constructorArguments: [],
        });
        console.log(`✔️  ${name} verified: https://sepolia.etherscan.io/address/${address}#code`);
      } catch (err) {
        // Common cases: already verified, rate‑limit, or propagation delay
        console.warn(`  ↳ verification skipped / failed: ${err.message}`);
      }
    }
  } else {
    console.log("(ETHERSCAN_API_KEY not set — skipping verification)");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
