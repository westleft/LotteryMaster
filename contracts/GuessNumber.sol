// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error GuessNumber__NotOwner();
error GuessNumber__PaymentNotEnough(); // Insufficient

contract GuessNumber is VRFConsumerBaseV2 { 
    VRFCoordinatorV2Interface COORDINATOR;

    address private immutable i_owner;
    /**
     付款相關變數
    */
    mapping (address => uint) paymentAddress;
    uint256 private totalPayments; // 所有付款金額
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

    uint256 private randomWords; // 隨機數字
    bool private creatingRandomNumber = true;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert GuessNumber__NotOwner();
        _;
    }

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
    }

    // 付款到 totalPayments
    function payment() external payable {
        if (msg.value < minPayment) revert GuessNumber__PaymentNotEnough();
        totalPayments += msg.value;
        
        paymentAddress[msg.sender] += msg.value;
    }

    // 產生隨機數字
    function requestRandomWords() external {
        requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subId,
            requestConfirmations,
            i_callbackGasLimit,
            numWords
        );
    }
    function fulfillRandomWords(uint256 /* requestId*/, uint256[] memory s_randomWords) internal override {
        randomWords = s_randomWords[0];
    }



    // 抽獎
    // 1.比對結果是否正確
    // 2.錢不夠
    // 3.已中獎，產生數字以前不能抽獎

    // 取得合約佈署者
    function getContractOwner() external view returns (address) {
        return i_owner;
    }

    function getTotalPayments() external view returns (uint256) {
        return totalPayments;
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

    function getRandomWord() external view returns(uint256) {
        return randomWords;
    }
}
