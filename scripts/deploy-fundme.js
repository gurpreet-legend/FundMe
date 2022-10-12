const hre = require("hardhat");

async function main() {
  // Deploying Contract
  const fundMeFactory = await hre.ethers.getContractFactory("FundMe", {
    libraries: {
      PriceConverter: "0x10F2a0AF966a8A1e550cE8791247643A9f9b98eA",
    }
  });
  const fundMe = await fundMeFactory.deploy();
  
  console.log(`Deploying FundMe Contract ....`);
  await fundMe.deployed();
  console.log(`FundMe Contract deployed at address: ${fundMe.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
