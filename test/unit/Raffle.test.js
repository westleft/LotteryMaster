const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChain, networkConfig } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChain.includes(network.name)
  ? describe.skip
  : describe("Raffle unit test", () => {
    let guessNumberContract, deployer;
    const chainId = network.config.chainId;

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer;
      await deployments.fixture(["all"]);

      guessNumberContract = await ethers.getContract("GuessNumber", deployer);
    })

    describe("constructor", () => {
      it("check deployer is contract owner", async () => {
        const contractOwner = await guessNumberContract.getContractOwner();
        assert.equal(contractOwner, deployer);
      })
    })
  })
