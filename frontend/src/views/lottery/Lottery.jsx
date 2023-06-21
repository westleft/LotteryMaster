import s from "./Lottery.module.scss";
import LotteryInput from "@/components/lottery/LotteryInput"
import { toast } from 'react-toastify';
import { useContract } from "@/hooks/useContract"
import { useEffect, useState } from "react";
import { contractAddress, abi } from "@/abi/"
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const LotteryPage = () => {
  const dispatch = useDispatch();
  const chainId = useSelector(state => state.network.chainId);
  const [contractBalance, setContractBalance] = useState(0);
  const [userBalance, setUserBalance] = useState(0);

  const getContractBalance = async () => {
    try {
      const contract = await useContract(contractAddress, abi);
      const res = await contract.getContractBalance();
      const balance = ethers.formatEther(res);
      setContractBalance(balance);
    } catch (err) {
      toast(err.reason);
      console.log(err);
    }
  }

  const getUserBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(window.ethereum.selectedAddress);
      
      setUserBalance((ethers.formatEther(balance)).slice(0, 6));
    } catch (error) {
      console.error("獲取餘額時發生錯誤：", error);
    }
  }

  useEffect(() => {
    if (window.ethereum.chainId !== "0xaa36a7") return;
    getContractBalance();
    getUserBalance();
  }, [chainId])

  return (
    <div className={s["lottery"]}>
      <h2 className={s["lottery__total-price"]}>目前累積總獎金為 <span>{contractBalance} ETH</span></h2>
      <LotteryInput 
        getUserBalance={getUserBalance} 
        getContractBalance={getContractBalance} 
        userBalance={userBalance}
      />
      <p className={s["lottery__user-balance"]}>
        您目前的資金為: { userBalance } ETH
      </p>
    </div>
  )
}

export const loader = async () => {
  if (screen.width < 650) {
    toast.error("目前不支援手機版");
    return redirect("/");
  }

  if (!window.ethereum.selectedAddress) {
    toast.error("請先連結錢包才可抽獎");
    return redirect("/");
  }
  return null;
};

export default LotteryPage;
