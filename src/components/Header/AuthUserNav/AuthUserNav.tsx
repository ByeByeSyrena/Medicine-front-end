import React from "react";
import { NavLink } from "react-router-dom";
import css from "./AuthUserNav.module.css";
import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/stores/selectors";

const AuthUserNav: React.FC = () => {
  const addedToCart = useSelector(selectCart);
  const isLength = addedToCart.length;
  return (
    <nav>
      <ul className={css.nav}>
        <li>
          <NavLink to="/shop" className={css.link}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={css.logo}>
            <img
              src={require("../../../images/icons8-cart-30.png")}
              alt="logo"
              className={css.logo}
            />
            {isLength > 0 && <span className={css.lengthSpan}>{isLength}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AuthUserNav;
