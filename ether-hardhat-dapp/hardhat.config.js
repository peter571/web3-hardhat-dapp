require("@nomiclabs/hardhat-waffle");
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.PROJECTID}`,
      accounts: [`${process.env.MNEMONIC}`]
    }
  }
};

