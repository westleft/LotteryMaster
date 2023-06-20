import s from "./TestCoin.module.scss"
import { NavLink } from "react-router-dom"

import GetTokenImage from "@/assets/images/tutorial/get_token.jpg"
import ConfirmationImage from "@/assets/images/tutorial/confirmation.jpg"
import SuccessImage from "@/assets/images/tutorial/success.jpg"

const TestCoinPage = () => {
  return (
    <div className={s["coin"]}>
      <div className={s["coin__wrap"]}>
        <h1 className={s["coin__title-h1"]}>領取測試幣</h1>
        <p className={s["coin__text"]}>在領取測試幣以前，請先安裝 <a className={s["coin__link"]} href="https://metamask.io/">Metamask</a> 以及準備一組 Twitter 帳號，稍後我們會使用到。</p>
        <p className={s["coin__text"]}> 您要安裝的 Metamask 是一個瀏覽器上的擴充套件，可以透過錢包介面更方便的進行交易操作。 </p>

        <h2 className={s["coin__title-h2"]}>建立錢包</h2>
        <p className={s["coin__text"]}>
          安裝完成後 Metamask 會要求您匯入私鑰或是建立新錢包，如果您沒有錢包可以建立一個新的，建立過程中會要求您記下 12 個助詞，未來如果忘記密碼可以透過這 12 個助詞將錢包找回，因此切忌妥善保管。
        </p>

        <h2 className={s["coin__title-h2"]}>Sepolia 測試網</h2>
        <p className={s["coin__text"]}>
          Lottery Master 是建立在 Sepolia 測試網路上，因此我們需要前往 ChainLink 的 
          <a className={s["coin__link"]} href="https://faucets.chain.link/" target="_blank"> Get Sepolia Testnet LINK Tokens </a>頁面連接錢包，
        </p>

        <img className={s["coin__image"]} src={GetTokenImage} alt="領取測試代幣" />

        <p className={s["coin__text"]}> 如果已經連結錢包，Address 會自動帶入錢包地址。接著登入 Twitter、驗證「我是人類」，再按下「Send request」後可以看到這筆交易的進度 </p>

        <img className={s["coin__image"]} src={ConfirmationImage} alt="等待交易完成" />

        <p className={s["coin__text"]}> 進度條跑完後點選 Close 按鈕關閉，接著可以到右上角點選 Metamask 的圖示，會出現彈跳視窗：</p>

        <img src={SuccessImage} alt="確認交易成功" />
        
        <p className={s["coin__text"]}>
          在彈窗的下方可以看到「接收 0.1 SepoliaETH」，表示測試幣已經成功轉入錢包了，接下來就可以回到 <NavLink className={s["coin__link"]} to="/lottery">抽獎頁</NavLink> 開始抽獎囉！
        </p>
      </div>
    </div>
  )
}

export default TestCoinPage