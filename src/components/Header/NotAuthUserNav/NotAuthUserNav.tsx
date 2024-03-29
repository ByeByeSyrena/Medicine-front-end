import React from "react";
import { NavLink } from "react-router-dom";
import "./active.css";
import css from "./NotAuthUserNav.module.css";
import { ReactComponent as ShopImg } from "../../../images/shop.svg";

const NotAuthUserNav: React.FC = () => {
  return (
    <nav className={css.nav}>
      <div>
        <NavLink to="/shop" className={css.link}>
          <ShopImg className={css.shopSvg} />
        </NavLink>
      </div>

      <ul className={css.authNav}>
        <li className={css.sellerNavBtn}>
          <NavLink to="/" className={css.link}>
            I am a seller
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={css.link}>
            SignUp
          </NavLink>
        </li>
        <li>
          <div className={css.line}></div>
        </li>
        <li>
          <NavLink to="/login" className={css.link}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NotAuthUserNav;
