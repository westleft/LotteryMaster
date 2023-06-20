import s from "./Header.module.scss";
import Logo from "@/assets/images/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom"
import { authActions } from "@/store/auth"
import { ethers } from "ethers"
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useConnectState } from "@/hooks/useConnectState"
import { useNetworkVaild } from "@/hooks/useNetwork"

const Header = () => {
  const navRoute = [
    { to: "/lottery", text: "前往抽獎" },
    { to: "/test-coin", text: "領取測試幣" },
    { to: "/rule", text: "抽獎規則" },
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

    // if (window.ethereum._metamask.isUnlocked()) {
    //   toast.error("等待先前的請求完成...");
    //   return;
    // }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      useConnectState(dispatch);
      useNetworkVaild(dispatch);
    } catch(err) {
      console.log(err);
      if (err.message === "User rejected the request.") {
        toast.error("您已拒絕連接");
      }
    }
  }

  return (
    <>
      <header className={s["header"]}>
        <ul className={s["header__list"]}>
          <li className={s["header__list-item"]}>
            <h2 className={s["header__title"]}>
              <Link to="/">
                <img src={Logo} alt="LotteryMaster" />
              </Link>
            </h2>
          </li>
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
        </ul>
        {
          isLogin ? 
          <p className={s["header__address"]}>
            錢包地址: { walletAddress.slice(0, 6) }...{ walletAddress.slice(walletAddress.length - 6, walletAddress.length) }
          </p> : 
          <button 
            onClick={connectWallet}
            className={`${s["header__btn"]} ${s["header__btn-login"]}`}
          > 
            連接錢包
          </button>
        }
      </header>
      <div className={s["header__box"]}></div>
    </>
  )
}

export default Header
