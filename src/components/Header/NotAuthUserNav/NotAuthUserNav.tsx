import React from "react";
import { NavLink } from "react-router-dom";
import css from "./NotAuthUserNav.module.css";

const NotAuthUserNav: React.FC = () => {
  return (
    <nav>
      <ul className={css.nav}>
        <li>
          <NavLink to="/shop" className={css.link}>
            Shop
          </NavLink>
        </li>

        <React.Fragment>
          <li>
            <NavLink to="/signup" className={css.link}>
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={css.link}>
              Login
            </NavLink>
          </li>
        </React.Fragment>
      </ul>
    </nav>
  );
};

export default NotAuthUserNav;
