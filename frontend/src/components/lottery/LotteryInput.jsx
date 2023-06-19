import s from "./LotteryInput.module.scss";
import { useRef, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { contractAddress, abi } from "@/abi/";
import { ethers } from "ethers";
import { useContract } from "@/hooks/useContract";

const LotteryInput = () => {
  const inputDom = useRef();

  const checkInputIsValid = () => {
    const { value } = inputDom.current;
    if (!value || value > 10 || value < 0) {
      toast.error("只允許輸入 1 ~ 10 之間的數字");
      return false;
    }

    return true;
  }

  const drawLottery = async () => {
    const isInputValValid  = checkInputIsValid();
    if (!isInputValValid) return;

    try {
      const { value } = inputDom.current;
      const contract = await useContract(contractAddress, abi);
      const res = await contract.drawLottery(value, { value: ethers.parseEther("0.01")});

    } catch(err) {
      const { reason } = err;
      if (reason === "rejected") {
        toast("您已取消本次抽獎");
      }
      // const { message } = err;
      // toast.error(message);
    }
  }

  return (
    <div className={s["lottery_i"]}>
      <input className={s["lottery_i__input"]} type="number" placeholder="請輸入 1 ~ 10" ref={inputDom} />
      <button onClick={drawLottery} className={s["lottery_i__btn"]}>抽獎</button>
    </div>
  )
}

export default LotteryInput;
