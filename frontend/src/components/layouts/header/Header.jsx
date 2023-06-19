import s from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom"
import { authActions } from "@/store/auth"
import { ethers } from "ethers"
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useConnectState } from "@/hooks/useConnectState"

const Header = () => {
  const navRoute = [
    { to: "/", text: "link1" },
    { to: "/lottery", text: "link2" },
  ]

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const walletAddress = useSelector(state => state.auth.walletAddress);

  const loginHandler = () => {
    dispatch(authActions.login())
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("請先安裝 MetaMask 錢包");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      useConnectState(dispatch);

    } catch(err) {
      console.log(err);
      if (err.message === "User rejected the request.") {
        toast.error("您已拒絕連接");
      }
    }

    // const provider = new ethers.BrowserProvider(window.ethereum);
    // console.log(provider)
  }
  return (
    <>
      <header className={s["header"]}>
        <h2 className={s["header__title"]}>
          <Link to="/">LotteryMaster</Link>
        </h2>
        <ul className={s["header__list"]}>
          {
            navRoute.map(({to, text}) =>
              <li key={to} className={s["header__list-item"]}>
                <NavLink
                  to={to}
                  className={({isActive}) => isActive ? s["header__link-active"] : s["header__link"]}
                >
                  {text}
                </NavLink>
              </li>
            )
          }
          <li className={s["header__list-item"]}>
            <button 
              onClick={connectWallet}
              className={`${s["header__btn"]} ${s["header__btn-login"]}`}
            >
              { isLogin ? walletAddress : "連接錢包" }
              {/* connect */}
            </button>
          </li>
        </ul>
      </header>
      <div className={s["header__box"]}></div>
    </>
  )
}

export default Header
