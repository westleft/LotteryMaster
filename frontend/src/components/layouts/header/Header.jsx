import s from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom"

const Header = () => {
  const navRoute = [
    { to: "/", text: "link1" },
    { to: "/lottery", text: "link2" },
  ]

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
            <button className={`${s["header__btn"]} ${s["header__btn-login"]}`}>連接錢包</button>
          </li>
        </ul>
      </header>
      <div className={s["header__box"]}></div>
    </>
  )
}

export default Header
