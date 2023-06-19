import s from "./Lottery.module.scss";
import LotteryInput from "@/components/lottery/LotteryInput"
import { useLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContract } from "@/hooks/useContract"
import { useEffect, useState } from "react";
import { contractAddress, abi } from "@/abi/"
import { ethers } from "ethers";

const LotteryPage = () => {
  const [contractBalance, setContractBalance] = useState(0);
  const data = useLoaderData();

  const getContractBalance = async () => {
    try {
      const contract = await useContract(contractAddress, abi);
      const res = await contract.getContractBalance();
      const balance = ethers.formatEther(res);
      setContractBalance(balance);
    } catch(err) {
      toast(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    getContractBalance()
  }, [])

  return(
    <div className={s["lottery"]}>
      <h3>目前累積獎金為 { contractBalance }</h3>
      <LotteryInput />
    </div>
  )
}

export default LotteryPage;
