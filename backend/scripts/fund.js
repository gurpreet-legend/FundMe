const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Funding
  const DEPLOYED_CONTRACT_ADDRESS = process.env.DEPLOYED_CONTRACT_ADDRESS
  const fundMe = await hre.ethers.getContractAt("FundMe", DEPLOYED_CONTRACT_ADDRESS);

  console.log(`Fundme address: ${fundMe.address}`)
  
  const response = await fundMe.fund({
    value: ethers.utils.parseEther("0.01")
  })
  await response.wait() // Block confirmations 6 in hardhat config!
  console.log("Funded!! Done✨")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});