const CELOGramNFT = artifacts.require("CELOGramNFT");

module.exports = function (deployer) {
  deployer.deploy(CELOGramNFT, "0xDa71aC06539072C3ddCc27296C77e3065875E2Ef");
};