import { ethers } from "hardhat";

async function main() {
  const upload = await ethers.deployContract("Upload");

  await upload.waitForDeployment();

  console.log(`contract deployed at ${upload.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
