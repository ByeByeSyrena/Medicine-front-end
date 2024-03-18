import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./AuthUserNav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/stores/selectors";

import { AppDispatch } from "../../../redux/store";
import { logoutThunk } from "../../../redux/auth/users/operations";

const AuthUserNav: React.FC = () => {
  const addedToCart = useSelector(selectCart);
  const isLength = addedToCart.length;

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shop";

  const handleClick = () => {
    dispatch(logoutThunk());
    navigate(from, { replace: true });
  };

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
        <button onClick={handleClick}>LOGOUT</button>
      </ul>
    </nav>
  );
};

export default AuthUserNav;
