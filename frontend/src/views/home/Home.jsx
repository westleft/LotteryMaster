import s from "./Home.module.scss"
import { useLoaderData, useRouteError, json } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { counterActions } from "@/store/counter"
import { add } from "@/store/auth"
import { useState, useEffect } from "react"

import homeBanner from '@/assets/images/home.svg'

const HomePage = () => {
  const data = useLoaderData()

  const counter = useSelector(state => state.counter.counter);
  const show = useSelector(state => state.counter.show);
  const dispatch = useDispatch();

  const incr = () => {
    dispatch(counterActions.increment())
  }

  const customInc = () => {
    dispatch(counterActions.increase(10))
  }

  const decr = () => {
    dispatch(counterActions.decrement())
  }

  const showCounter = () => {
    dispatch(counterActions.toggle());
  }

  const [catData, setCatData] = useState([])

  const getData = async () => {
    const res = await fetch("https://cat-fact.herokuapp.com/facts");
    const d = await res.json()
    setCatData(d)
  }

  useEffect(() => {
    getData()
    dispatch(add())
  }, [])


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
          {/* <HomeBanner /> */}
        </div>


        {/* {
          catData.map(item => 
            <p key={item.text}>
              {item.text}
              <br />
              ------
            </p>
          )
        }
        <button onClick={getData}>getDat</button>
        {show && <p>{counter}</p>}
        <button onClick={incr}>++</button>
        <button onClick={decr}>--</button>
        <button onClick={customInc}>customInc</button>
        <button onClick={showCounter}>show</button>
        <h1>HomePage</h1> */}


      </main>
    </>
  )
}

export const homeLoader = async () => {
  return json({ msg: "wow opop" })
}

export default HomePage;
