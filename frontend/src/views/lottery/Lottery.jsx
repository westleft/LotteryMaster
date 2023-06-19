import s from "./Lottery.module.scss";
import LotteryInput from "@/components/lottery/LotteryInput"
import { useLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContract } from "@/hooks/useContract"
import { useNetworkVaild } from "@/hooks/useNetwork"
import { useEffect, useState } from "react";
import { contractAddress, abi } from "@/abi/"
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import network from "../../store/network";

const LotteryPage = () => {
  const dispatch = useDispatch();
  const chainId = useSelector(state => state.network.chainId);
  const [contractBalance, setContractBalance] = useState(0);
  const data = useLoaderData();

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

  useEffect(() => {
    (async () => {
      const nwtworkIsSepolia = await useNetworkVaild(dispatch);
      if (nwtworkIsSepolia) {
        getContractBalance();
      }
    })()
  }, [])

  useEffect(() => {
    getContractBalance();
    console.log("??")
  }, [chainId])

  return (
    <div className={s["lottery"]}>
      <h3>目前累積獎金為 {contractBalance}</h3>
      <LotteryInput />
    </div>
  )
}

export default LotteryPage;
