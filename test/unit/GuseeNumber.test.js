const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChain, networkConfig } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChain.includes(network.name)
  ? describe.skip
  : describe("Guess number unit test", () => {
    let guessNumberContract;
    let deployer;
    let vrfCoordinatorV2Mock;
    const chainId = network.config.chainId;

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer;
      await deployments.fixture(["all"]);

      guessNumberContract = await ethers.getContract("GuessNumber", deployer);
      vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer);
    })

    describe("constructor", () => {
      it("check deployer is contract owner", async () => {
        const contractOwner = await guessNumberContract.getContractOwner();
        assert.equal(contractOwner, deployer);
      })
    })

    describe("抽獎", () => {
      it("付的金額不足", async () => {
        await expect(guessNumberContract.drawLottery(1, { value: ethers.utils.parseEther("0.001") }))
          .to.be.revertedWithCustomError(guessNumberContract, "GuessNumber__PaymentNotEnough");
      })

      it("猜的數字範圍不對", async () => {
        // await guessNumberContract.requestRandomWords();
        // const requestId = await guessNumberContract.requestId();
        // await vrfCoordinatorV2Mock.fulfillRandomWords(requestId.toString(), guessNumberContract.address);
        await expect(guessNumberContract.drawLottery(50, { value: ethers.utils.parseEther("0.01") }))
          .to.be.revertedWithCustomError(guessNumberContract, "GuessNumber__OutOfRange");
      })

      it("猜數字", async () => {
        const loseTransaction = await guessNumberContract.drawLottery(3, { value: ethers.utils.parseEther("0.01") });
        const loseTransactionReceipt = await loseTransaction.wait();
        const { event } = loseTransactionReceipt.events[0];
        assert.equal(event, "NotWinner");

        const winTransaction = await guessNumberContract.drawLottery(7, { value: ethers.utils.parseEther("0.01") });
        const winTransactionReceipt = await winTransaction.wait();
        const result = (winTransactionReceipt.events).some(event => event.event === "Winner");
        assert.equal(result, true);
      })

      it("答對後轉帳", async () => {
        const beforeBalance = await ethers.provider.getBalance(deployer);
        const transaction = await guessNumberContract.drawLottery(7, { value: ethers.utils.parseEther("0.01") });
        await transaction.wait();
        const afterBalance = await ethers.provider.getBalance(deployer);
        assert(afterBalance > beforeBalance, true);
      })

      it("隨機數字還沒產生", async () => {
        const transaction = await guessNumberContract.drawLottery(7, { value: ethers.utils.parseEther("0.01") });
        await expect(guessNumberContract.drawLottery(5, { value: ethers.utils.parseEther("0.01") }))
          .to.be.revertedWithCustomError(guessNumberContract, "GuessNumber__RandomNumberCreating");
      })

      it("隨機數字已產生，繼續抽獎", async () => {
        const transaction = await guessNumberContract.drawLottery(7, { value: ethers.utils.parseEther("0.01") });
        const requestId = await guessNumberContract.requestId();
        await vrfCoordinatorV2Mock.fulfillRandomWords(requestId.toString(), guessNumberContract.address);
        await guessNumberContract.drawLottery(5, { value: ethers.utils.parseEther("0.01") });
      })
    })

    describe("檢查紀錄", () => {
      it("透過 address 取得付款金額", async () => {
        // const [owner, otherAccount] = await ethers.getSigners();
        // const secondAddressSigner = await ethers.getSigner(otherAccount.address)
        for (let i = 0; i < 3; i++) {
          await guessNumberContract.drawLottery(1, { value: ethers.utils.parseEther("0.01") });
        }
        const playerBalance = await guessNumberContract.getAmountByAddress(deployer);
        assert.equal(ethers.utils.formatEther(playerBalance), "0.03");
      })
    })
  })
