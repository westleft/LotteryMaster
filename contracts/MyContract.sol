// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error GuessNumber__NotOwner();

contract GuessNumber {
  address immutable private i_owner;
  uint256 private totalPayments; // 所有付款金額
  uint256 private randomNumber; // 隨機數字
  bool private creatingRandomNumber = true;

  modifier onlyOwner {
      if (msg.sender != i_owner) revert GuessNumber__NotOwner();
      _;
  }

  constructor() {
      i_owner = msg.sender;
  }

  // 付款到池子裡

  // 抽獎
  // 1.比對結果是否正確
  // 2.錢不夠
  // 3.已中獎，產生數字以前不能抽獎

  // 產生隨機數字

  

  // 取得合約佈署者
  function getContractOwner() external view returns(address){
      return i_owner;
  }

  function getTotalPayments() external view returns(uint256){
      return totalPayments;
  }
}