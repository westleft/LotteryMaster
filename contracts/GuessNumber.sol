// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error GuessNumber__NotOwner();
error GuessNumber__PaymentNotEnough(); // Insufficient
error GuessNumber__RandomNumberCreating();
error GuessNumber__OutOfRange();
error GuessNumber__TransferFailed();

contract GuessNumber is VRFConsumerBaseV2 { 
    event NotWinner(address indexed player, uint256 playerNumber);
    event Winner(address indexed player, uint256 playerNumber);

    address private immutable i_owner;
    /**
     付款相關變數
    */
    mapping (address => uint) paymentAddress;
    uint256 private minPayment = 0.1 ether;

    /**
     vrf 相關變數
    */
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subId;
    uint16 private constant requestConfirmations = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant numWords = 1;
    uint256 public requestId;

    /**
     隨機數字 相關變數
    */

    uint256 private randomWord; // 隨機數字
    bool private creatingRandomNumber = true;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert GuessNumber__NotOwner();
        _;
    }

    receive() external payable {}

    constructor(
        address vefCoordinatorV2, 
        bytes32 gasLane,
        uint64 subId,
        uint32 callbackGasLimit 
    ) VRFConsumerBaseV2(vefCoordinatorV2) payable {
        i_owner = msg.sender;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vefCoordinatorV2);
        i_gasLane = gasLane;
        i_subId = subId;
        i_callbackGasLimit = callbackGasLimit;

        requestRandomWords();
    }

    // 產生隨機數字
    function requestRandomWords() private {
        creatingRandomNumber = true;
        requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subId,
            requestConfirmations,
            i_callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 /* requestId*/, uint256[] memory s_randomWords) internal override {
        randomWord = limitToRange(s_randomWords[0]);
        creatingRandomNumber = false;
    }

    // 產生 1~10 的數字
    function limitToRange(uint256 _randomNumber) private pure returns (uint8) {
        uint8 minValue = 1;
        uint8 maxValue = 10;
        uint8 range = maxValue - minValue + 1;
        return uint8(_randomNumber % range) + minValue;
    }

    // 抽獎
    function drawLottery(uint256 _playerNumber) public payable returns(bool) {
        if (msg.value < minPayment) revert GuessNumber__PaymentNotEnough();
        if (creatingRandomNumber) revert GuessNumber__RandomNumberCreating();
        if (_playerNumber > 10 || _playerNumber < 1) revert GuessNumber__OutOfRange();

        paymentAddress[msg.sender] += msg.value;

        if (randomWord != _playerNumber) {
            emit NotWinner(msg.sender, _playerNumber);
            return false;
        } 

        uint256 prizeAmount = address(this).balance * 80 / 100; // 80% 的錢錢
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        if (!success) {
            revert GuessNumber__TransferFailed();
        }
        requestRandomWords();
        emit Winner(msg.sender, _playerNumber);
        return true;
    }

    // 取得合約佈署者
    function getContractOwner() external view returns (address) {
        return i_owner;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getMinPayment() external view returns (uint256) {
        return minPayment;
    }

    function getAmountByAddress(address _address) external view returns(uint256) {
        return paymentAddress[_address];
    }

    function getRandomWord() external view onlyOwner() returns(uint256) {
        return randomWord;
    }
}
