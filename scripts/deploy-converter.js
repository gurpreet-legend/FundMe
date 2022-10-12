const hre = require("hardhat");

async function main() {
  // Deploying Contract
  const priceConverterFactory = await hre.ethers.getContractFactory("PriceConverter");
  const priceConverter = await priceConverterFactory.deploy();
  
  console.log(`Deploying Price Converter Contract ....`);
  await priceConverter.deployed();
  console.log(`Price Converter Contract deployed at address: ${priceConverter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
