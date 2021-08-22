const FundPost = artifacts.require("FundPost");

module.exports = function (deployer) {
  deployer.deploy(FundPost)
  .then(() => console.log(FundPost.address))

    // Option 3) Retrieve the contract instance and get the address from that:
    .then(() => FundPost.deployed())
    .then(_instance => console.log(_instance.address));
};