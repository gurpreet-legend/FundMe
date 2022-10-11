const hre = require("hardhat");

async function main() {
  // Deploying Contract
  const fundMeFactory = await hre.ethers.getContractFactory("FundMe");
  const fundMe = await fundMeFactory.deploy();
  
  console.log(`Deploying Contract ....`);
  await fundMe.deployed();
  console.log(`Contract deployed at address: ${fundMe.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
