const { network, ethers } = require("hardhat");
const { developmentChain, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../helper-hardhat-config");

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { chainId } = network.config;

  const {
    VRFCoordinatorV2Mock,
    vrfCoordinatorV2Address,
    gasLane,
    subId,
    callbackGasLimit
  } = await createDeployArgs(network);

  const guessNumberContract = await deploy("GuessNumber", {
    from: deployer,
    args: [
      vrfCoordinatorV2Address,
      gasLane,
      subId,
      callbackGasLimit
    ],
    waitConfirmation: network.config.blockConfirmations || 1,
    log: true,
    gasLimit: 2000000,
    // value: ethers.utils.parseEther('10')
  })

  if (chainId === 31337) {
    await VRFCoordinatorV2Mock.addConsumer(
      subId.toNumber(),
      guessNumberContract.address
    )
  }
}

// 產生部署要用的參數
const createDeployArgs = async (network) => {
  let VRFCoordinatorV2Mock,
    vrfCoordinatorV2Address,
    gasLane,
    subId,
    callbackGasLimit

  const { chainId } = network.config;

  if (developmentChain.includes(network.name)) {
    // dev
    VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
    const transactionResponse = await VRFCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait(1);
    subId = transactionReceipt.events[0].args.subId;
    await VRFCoordinatorV2Mock.fundSubscription((subId.toNumber()), VRF_SUB_FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinator;
    subId = networkConfig[chainId].subscriptionId;
  }
  
  callbackGasLimit = networkConfig[chainId].callbackGasLimit;
  gasLane = networkConfig[chainId].gasLane;

  return {
    VRFCoordinatorV2Mock,
    vrfCoordinatorV2Address,
    gasLane,
    subId,
    callbackGasLimit
  }
}

module.exports.tags = ["all", "guess-number"];
