const { accept } = require("chai");

describe("FundMe", function () {
  beforeEach("Deployment", async() => {
    // Deploying Price Converter Contract
    const priceConverterFactory = await hre.ethers.getContractFactory("PriceConverter");
    const priceConverter = await priceConverterFactory.deploy();
    
    console.log(`Deploying Price Converter Contract ....`);
    await priceConverter.deployed();
    console.log(`Price Converter Contract deployed at address: ${priceConverter.address}`);

    // Deploying FundeMe Contract
    const fundMeFactory = await hre.ethers.getContractFactory("FundMe", {
      libraries: {
        PriceConverter: priceConverter.address,
      }
    });
    const fundMe = await fundMeFactory.deploy();
    console.log(`Deploying FundMe Contract ....`);
    await fundMe.deployed();
    console.log(`FundMe Contract deployed at address: ${fundMe.address}`);
  })

  // it("Checking minimum $10 limit", async() => {
    


  // })
  // it()
});
