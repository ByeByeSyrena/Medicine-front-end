import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

import "./header.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* <NavLink to="/welcome">
          <img
            src={require('../../images/icons8-car-50.png')}
            alt="logo"
            className={css.logo}
          />
        </NavLink> */}
        <nav>
          <ul className={css.nav}>
            <li>
              <NavLink to="/shop" className={css.link}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={css.link}>
                Shopping Cart
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/favorites" className={css.link}>
                Favorites
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
