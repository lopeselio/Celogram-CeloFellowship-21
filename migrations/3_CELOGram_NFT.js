const CELOGramNFT = artifacts.require("CELOGramNFT");
const CELOGramNFTMarket = artifacts.require("CELOGramNFTMarket")
const fs = require('fs')

module.exports = async function (deployer) {
  await deployer.deploy(CELOGramNFTMarket);
  const market = await CELOGramNFTMarket.deployed()
  await deployer.deploy(CELOGramNFT, market.address)
  const nft = await CELOGramNFT.deployed() 
  // let config = `
  // export const nftmarketaddress = "${market.address}"
  // export const nftaddress = "${nft.address}"
  // `
  console.log("market address:", market.address)
  console.log("nft address: ", nft.address)
  // let data = JSON.stringify(config)
  // fs.writeFileSync('config.js', JSON.parse(data))

}

