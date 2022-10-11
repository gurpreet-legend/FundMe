require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: "",
      accounts: [],
      chainId: 1337
    },
    goerli: {
      url: "",
      accounts: [],
      chainId: 4
    },
  }
};
