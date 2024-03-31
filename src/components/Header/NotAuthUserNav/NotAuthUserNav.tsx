import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./active.css";
import css from "./NotAuthUserNav.module.css";
import { ReactComponent as ShopImg } from "../../../images/shop.svg";
import { AnimatePresence } from "framer-motion";
import SellerAuthWindow from "../../SellerAuthWindow/SellerAuthWindow";
import { motion } from "framer-motion";

const NotAuthUserNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <nav className={css.nav}>
        <div>
          <NavLink to="/shop" className={css.link}>
            <ShopImg className={css.shopSvg} />
          </NavLink>
        </div>

        <ul className={css.authNav}>
          <motion.li
            className={css.sellerNavBtn}
            animate={{ x: -50 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <motion.button
              whileHover={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 0, 30, -30, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
              type="button"
              onClick={toggleVisibility}
              className={css.link}
            >
              I am a seller
            </motion.button>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink to="/signup" className={css.link}>
              SignUp
            </NavLink>
          </motion.li>
          <li>
            <div className={css.line}></div>
          </li>
          <motion.li
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink to="/login" className={css.link}>
              Login
            </NavLink>
          </motion.li>
        </ul>
      </nav>
      <AnimatePresence>
        {isVisible && <SellerAuthWindow onClose={toggleVisibility} />}
      </AnimatePresence>
    </>
  );
};

export default NotAuthUserNav;
