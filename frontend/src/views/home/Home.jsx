import s from "./Home.module.scss"
import { useLoaderData, useRouteError, json } from "react-router-dom"
const HomePage = () => {
  // const error = useRouteError();
  const data = useLoaderData()

  console.log(data)
  return (
    <>
      <main className={s["home"]}>
        <p>{ data.msg }</p>
      
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
