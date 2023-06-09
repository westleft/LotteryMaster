const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChain, networkConfig } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChain.includes(network.name)
  ? describe.skip
  : describe("Guess number unit test", () => {
    let guessNumberContract
    let deployer;
    let vrfCoordinatorV2Mock;
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

    describe("payment", () => {
      let minPayment; // 最低付款金額
      let ethMinPayment;
      
      beforeEach(async () => {
        minPayment = await guessNumberContract.getMinPayment();
        ethMinPayment = ethers.utils.formatEther(minPayment);
      })

      it("發送金額低於最低限制", async () => {
        const sendETH = (ethMinPayment - 0.01).toString();
        await expect(guessNumberContract.payment({ value: ethers.utils.parseEther(sendETH) }))
          .to.be.revertedWithCustomError(guessNumberContract, "GuessNumber__PaymentNotEnough");
      })

      it("確認合約內的金額與發送金額相同", async () => {
        await guessNumberContract.payment({ value: ethers.utils.parseEther(ethMinPayment) });
        const balance = await guessNumberContract.getContractBalance();
        const ethBalance = ethers.utils.formatEther(balance);
        assert.equal(ethBalance, ethMinPayment);
      })

      it("確認 mapping 內的金額跟發送的一樣", async () => {
        for (let i = 0; i < 3; i++) {
          await guessNumberContract.payment({ value: ethers.utils.parseEther(ethMinPayment) });
        }
        const playerBalance = await guessNumberContract.getAmountByAddress(deployer)
        assert.equal(ethers.utils.formatEther(playerBalance), "0.3");
      })
    })

    describe("random number", () => {


      it("產生隨機數字", async () => {
        const tx = await guessNumberContract.requestRandomWords();
            // 等待足够的区块确认
        const requestConfirmationBlocks = 3;
        const blockTime = 15; // 假设区块时间为15秒
        const waitTime = requestConfirmationBlocks * blockTime;
        await network.provider.send("evm_increaseTime", [waitTime]);
        await network.provider.send("evm_mine");

        const randomNumber = await guessNumberContract.getRandomWord();
        console.log(randomNumber.toNumber())
        console.log(guessNumberContract.address)
      })

    })
  })
