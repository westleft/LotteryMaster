import s from "./Rule.module.scss";
import { NavLink } from "react-router-dom"

const Rule = () => {
  return (
    <div className={s["rule"]}>
      <div className={s["rule__wrap"]}>
        <h1 className={s["rule__title-h1"]}>抽獎規則</h1>
        <p className={s["rule__text"]}>在 Lottery Master 中，每次抽獎都需要花費 0.01 ETH，因為這個抽獎遊戲是搭建在測試網中，因此您不需要花費主網的 ETH，也就是說只要您持有測試代幣（免費），都可以參與 Lottery Master 的抽獎遊戲。</p>

        <h2 className={s["rule__title-h2"]}>如何領取測試代幣</h2>
        <p className={s["rule__text"]}> 
          如果您不知道如何領取測試代幣，可以前往 <NavLink className={s["rule__link"]} to="/test-coin"> 領取測試幣 </NavLink> 頁面。
        </p>

        <h2 className={s["rule__title-h2"]}>遊戲規則</h2>
        <p className={s["rule__text"]}> 
          樂透系統會產生一個 1 ~ 10 的隨機數字，您只需要選一個喜歡的數字、並投入 0.01 ETH 到總獎金中即可參與，如果您幸運猜中，系統會將「當前總獎金的 80%」匯入您的錢包。
        </p>
        <p className={s["rule__text"]}> 
          一旦您猜中並順利取得獎金後，系統會產生一個新的隨機數字，繼續下一輪的樂透抽獎。
        </p>

        <br />
        <p className={s["rule__text"]}> Good Luck！ </p>
      </div>
    </div>
  )
}

export default Rule;
