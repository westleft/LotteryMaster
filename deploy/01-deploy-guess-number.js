const { network, ethers } = require("hardhat");
const { developmentChain, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { chainId } = network.config;

  const raffle = await deploy("GuessNumber", {
    from: deployer,
    log: true,
  })
}

module.exports.tags = ["all", "guess-number"];
