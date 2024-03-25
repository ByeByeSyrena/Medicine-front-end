import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./AuthUserNav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/stores/selectors";
import { ReactComponent as ShopImg } from "../../../images/shop.svg";

import { AppDispatch } from "../../../redux/store";
import { logoutUser } from "../../../redux/auth/users/operations";

import { ReactComponent as Cart } from "../../../images/shopping-cart-drug-basket-shop.svg";
import { ReactComponent as Gear } from "../../../images/gear-11-svgrepo-com.svg";
import { ReactComponent as Logout } from "../../../images/logout-2-svgrepo-com.svg";
import { ReactComponent as Arrow } from "../../../images/arrow.svg";

import { motion } from "framer-motion";

const menuVariants = {
  open: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 0,
    x: -200,
    height: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const AuthUserNav = () => {
  const addedToCart = useSelector(selectCart);
  const isLength = addedToCart.length;

  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shop";

  const handleClick = () => {
    dispatch(logoutUser());
    navigate(from, { replace: true });
  };

  const handleMenuButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div className={css.menuWrapper}>
      <motion.button
        type="button"
        className={css.menu}
        onClick={handleMenuButton}
      >
        <motion.span>Menu</motion.span>
        <motion.span>
          <Arrow />
        </motion.span>
      </motion.button>
      <motion.ul
        className={css.ulMenu}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <motion.li
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          onClick={handleMenuButton}
        >
          <NavLink to="/shop" className={css.link}>
            <ShopImg className={css.shopSvg} />
            <span>Shop</span>
          </NavLink>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          onClick={handleMenuButton}
        >
          <NavLink to="/cart" className={css.link}>
            <Cart className={css.cartImg} />
            <span>Cart</span>
            {isLength > 0 && <span className={css.lengthSpan}>{isLength}</span>}
          </NavLink>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          onClick={handleMenuButton}
        >
          <motion.button>
            <Gear className={css.gearSvg} />
            <span>Settings</span>
          </motion.button>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          onClick={handleMenuButton}
        >
          <motion.button onClick={handleClick}>
            <Logout className={css.logoutSvg} />
            <span>Log out</span>
          </motion.button>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default AuthUserNav;
