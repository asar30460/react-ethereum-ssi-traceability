/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();
require("hardhat-ethernal");

module.exports = {
  solidity: "0.8.19",
  ethernal: {
    apiToken: process.env.ETHERNAL_API_TOKEN,
    email: process.env.ETHERNAL_EMAIL,
  },
};
