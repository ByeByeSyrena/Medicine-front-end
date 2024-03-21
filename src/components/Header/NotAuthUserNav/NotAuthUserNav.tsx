import React from "react";
import { NavLink } from "react-router-dom";
import css from "./NotAuthUserNav.module.css";
import { ReactComponent as ShopImg } from "../../../images/shop.svg";

const NotAuthUserNav: React.FC = () => {
  return (
    <nav>
      <div className={css.nav}>
        <div>
          <NavLink to="/shop" className={css.link}>
            <ShopImg className={css.shopSvg} />
          </NavLink>
        </div>

        <ul className={css.authNav}>
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
      </div>
    </nav>
  );
};

export default NotAuthUserNav;
