require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()

const MUMABI_URL = process.env.MUMABI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: MUMABI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
