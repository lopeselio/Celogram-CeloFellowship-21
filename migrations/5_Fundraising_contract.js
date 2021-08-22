const Fundraising = artifacts.require("Fundraising");

module.exports = function (deployer) {
  deployer.deploy(Fundraising)
  .then(() => console.log(Fundraising.address))

    // Option 3) Retrieve the contract instance and get the address from that:
    .then(() => Fundraising.deployed())
    .then(_instance => console.log(_instance.address));
};