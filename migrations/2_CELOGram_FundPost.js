const FundPost = artifacts.require("FundPost");

module.exports = function (deployer) {
  deployer.deploy(FundPost);
};