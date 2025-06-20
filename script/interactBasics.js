// script/interactBasics.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Using signer:", signer.address);

  // 배포된 컨트랙트 주소 정리
  const addresses = {
    VisibilityTest: "0x78e16e723adCa58c0C2089539a3A2ef0C265F438",
    FunctionExample:"0x1E08f982F48fF11aa033B200726D0aBACfE4da96",
    ControlFlow:    "0x330A9D7F9718592a1d90aC89F9c9dDCc31787c77",
    EventLogger:    "0x8198569A154302Ce9851123bf3D70234a80F29a4",
    OwnerOnly:      "0x1085F1C352C1fe0d8B251561Cdf2c73688961C7f",
    ErrorChecker:   "0x6C7743a205b724A119f91bBC21c0f66d7d8c7Eef",
    EtherWallet:    "0x0d257A1b099Bd3ce0F3d653F171e4ae0a3Bf9261",
  };

  /** 1. VisibilityTest.sol */
  const vis = await hre.ethers.getContractAt("VisibilityTest", addresses.VisibilityTest);
  const publicValue = await vis.z(); // public 함수 접근
  console.log("VisibilityTest → z():", publicValue);

  /** 2. FunctionExample.sol */
  const func = await hre.ethers.getContractAt("FunctionExample", addresses.FunctionExample);
  await func.increment();
  console.log("FunctionExample → count():", await func.count());
  console.log("FunctionExample → add(2, 5):", await func.add(2, 5));

  /** 3. ControlFlow.sol */
  const ctrl = await hre.ethers.getContractAt("ControlFlow", addresses.ControlFlow);
  console.log("ControlFlow → sumUpTo(10):", await ctrl.sumUpTo(10));
  console.log("ControlFlow → isEven(7):", await ctrl.isEven(7));

  /** 4. EventLogger.sol */
  const logger = await hre.ethers.getContractAt("EventLogger", addresses.EventLogger);
  const tx = await logger.writeLog("Hello Events!");
  await tx.wait();
  console.log("EventLogger → writeLog() called. Check logs on Etherscan!");

  /** 5. OwnerOnly.sol */
  const owner = await hre.ethers.getContractAt("OwnerOnly", addresses.OwnerOnly);
  await owner.setValue(123);
  console.log("OwnerOnly → value():", await owner.value());

  /** 6. ErrorChecker.sol */
  const error = await hre.ethers.getContractAt("ErrorChecker", addresses.ErrorChecker);
  console.log("ErrorChecker → divide(10,2):", await error.divide(10, 2));
  try {
    await error.divide(10, 0); // 의도적 오류 발생
  } catch (e) {
    console.warn("ErrorChecker → divide(10,0) threw:", e.message);
  }

  /** 7. EtherWallet.sol */
  const wallet = await hre.ethers.getContractAt("EtherWallet", addresses.EtherWallet);
  const balance = await wallet.getBalance();
  console.log("EtherWallet → getBalance():", balance.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
