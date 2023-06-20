import s from "./Home.module.scss";
import { NavLink } from "react-router-dom";

import homeBanner from "@/assets/images/home.png";

const HomePage = () => {
  return (
    <>
      <main className={s["home"]}>
        <div className={s["home__wrap"]}>
          <div className={s["home__container"]}>
            <p className={s["home__text-sub"]}>讓您一夜暴富的機會來了！</p>
            <h2 className={s["home__text-title"]}>
              只要 <span>0.01 ETH</span> <br />
              就能翻轉人生
            </h2>
            <NavLink 
              to="/lottery"
              className={s["home__btn-action"]}
            >
              立即抽獎
            </NavLink>
          </div>

          <img className={s["home__banner"]} src={homeBanner} alt="" />
        </div>
      </main>
    </>
  )
}

export default HomePage;
