import s from "./Home.module.scss"
import { useLoaderData, useRouteError, json } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { counterActions } from "@/store/counter"
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

  return (
    <>
      <main className={s["home"]}>
        {/* <p>{ data.msg }</p> */}
        {show && <p>{ counter }</p>}
        <button onClick={incr}>++</button>
        <button onClick={decr}>--</button>
        <button onClick={customInc}>customInc</button>
        <button onClick={showCounter}>show</button>
      <h1>HomePage</h1> 
      </main>
    </>
  )
}

export const homeLoader = async () => {
  console.log("??")
  return json({msg: "wow opop"})
}

export default HomePage;
