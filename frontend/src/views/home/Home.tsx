import s from "./Home.module.scss";
import homeBanner from "@/assets/images/home.png";
import { NavLink } from "react-router-dom";
import { useNetworkVaild } from "@/hooks/useNetwork";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/"; 

const HomePage = () => {
  const chainId = useSelector((state: RootState) => state.network.chainId);
  const dispatch = useDispatch();

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
            {
              (window.ethereum && chainId !== "0xaa36a7") &&
              <button 
                onClick={() => useNetworkVaild(dispatch)}
                className={s["home__btn-switch"]}
              >
                切換至 Sepolia 測試網
              </button>
            }

          </div>

          <img className={s["home__banner"]} src={homeBanner} alt="" />
        </div>
      </main>
    </>
  )
}

export default HomePage;
