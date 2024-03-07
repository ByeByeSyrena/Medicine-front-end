import css from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.css";
import { selectCart } from "../../redux/stores/selectors";

export const Header = () => {
  const addedToCart = useSelector(selectCart);
  const isLength = addedToCart.length;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav>
          <ul className={css.nav}>
            <li>
              <NavLink to="/shop" className={css.link}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={css.link}>
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={css.logo}>
                <img
                  src={require("../../images/icons8-cart-30.png")}
                  alt="logo"
                  className={css.logo}
                />
                {isLength > 0 && (
                  <span className={css.lengthSpan}>{isLength}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
