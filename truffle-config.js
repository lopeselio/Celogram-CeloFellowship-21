// const ContractKit = require('@celo/contractkit')
const Web3 = require('web3')
const path = require('path')
require("dotenv").config();
const ContractKit = require("@celo/contractkit");
const { LocalWallet } = require("@celo/wallet-local"); 
// Connect to the desired network
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
// const kit = ContractKit.newKitFromWeb3(web3)


// const getAccount = require('./utils/getAccount').getAccount

// async function awaitWrapper(){
//     let account = await getAccount()
//     console.log(`Account address: ${account.address}`)
//     kit.addAccount(account.privateKey)
// }

// awaitWrapper()
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const testnetURL = "https://alfajores-forno.celo-testnet.org";
const localWallet = new LocalWallet();
/*
Contractkit is used to access web3 object to interact with node's Json RPC API.
It takes two arguments, first being testnet url and second a wallet instance for signing transactions.
*/

const kit = ContractKit.newKit(testnetURL, localWallet);

async function setConfig() {
  kit.addAccount(PRIVATE_KEY);
  kit.defaultAccount = localWallet.getAccounts()[0];
}
setConfig();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  // The following line will put the compiled contracts and associated info at ./client/contracts
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',

  networks: {
    // Use the development network if you are using @celo/ganache-cli
    // https://www.npmjs.com/package/@celo/ganache-cli
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider,
      network_id: 44787
    },
    mainnet: {
      provider: kit.connection.web3.currentProvider,
      network_id: 42220
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.1", 
      optimizer: {
        enabled: true,
        runs: 200
      }   // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  db: {
    enabled: false
  },
  plugins: [
    'truffle-plugin-verify'
  ],
};