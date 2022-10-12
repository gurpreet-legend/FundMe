const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Funding
  const DEPLOYED_CONTRACT_ADDRESS = process.env.DEPLOYED_CONTRACT_ADDRESS
  const fundMe = await hre.ethers.getContractAt("FundMe", DEPLOYED_CONTRACT_ADDRESS);
  
  console.log(`Fundme address: ${fundMe.address}`)

  const response = await fundMe.withdraw()
  await response.wait() // Block confirmations 6 in hardhat config!
  console.log("Withdrawn!! Done✨")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});