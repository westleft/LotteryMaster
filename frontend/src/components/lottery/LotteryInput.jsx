import s from "./LotteryInput.module.scss";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import { contractAddress, abi } from "@/abi/";
import { ethers } from "ethers";
import { useContract } from "@/hooks/useContract";

const LotteryInput = ({getUserBalance, getContractBalance, userBalance}) => {
  const [resultPending, setResultPending] = useState(false);
  const inputDom = useRef();

  const checkInputIsValid = () => {
    const { value } = inputDom.current;
    if (!value || value > 10 || value < 0) {
      toast.error("只允許輸入 1 ~ 10 之間的數字");
      return false;
    }

    if (userBalance < 0.01) {
      toast.error("持有 ETH 不足");
      return false;
    }

    return true;
  }

  const drawLottery = async () => {
    const isInputValValid  = checkInputIsValid();
    if (!isInputValValid) return;
    setResultPending(true);

    try {
      const { value } = inputDom.current;
      const contract = await useContract(contractAddress, abi);
      const transaction = await contract.drawLottery(value, { value: ethers.parseEther("0.01") });
  
      // 等待交易確認
      const receipt = await toast.promise(
          transaction.wait(),
          {
            pending: "交易確認中...",
            success: "交易已完成",
            error: "交易失敗"
          }
      )

      const { eventName } = receipt.logs[0];
      if ( eventName === "NotWinner") {
        toast("沒有中獎，請再接再厲🤯")
      } else if( eventName === "Winner") {
        toast("恭喜您中獎！款項稍後將匯入您的錢包👌")
      }

      getUserBalance();
      getContractBalance();
      setResultPending(false);
    } catch(err) {
      const { reason } = err;

      if (reason === "rejected") {
        toast("您已取消本次抽獎");
      }
    }
  }

  return (
    <div className={s["lottery_i"]}>
      <input className={s["lottery_i__input"]} type="number" placeholder="請輸入 1 ~ 10" ref={inputDom} />
      <button 
        onClick={drawLottery} 
        className={`${s["lottery_i__btn"]} ${resultPending && s["btn-disable"]}`}
        disabled={resultPending}
      >抽獎</button>
    </div>
  )
}

export default LotteryInput;
