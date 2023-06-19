import s from "./Footer.module.scss";

const Footer = () => {

  return(
    <footer className={s["footer"]}>
      <p className={s["footer__text"]}>
        Copyright © 2022 <a className={s["footer__link"]} href="https://google.com" target="_blank">westleft</a>
      </p>
    </footer>
  )
}

export default Footer