import React from "react";
import ToggleButton from "./ToggleButton";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import css from "./AuthSellerNav.module.css";

import { motion } from "framer-motion";

import { ReactComponent as Logout } from "../../../images/logout-2-svgrepo-com.svg";

const Links: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shop";

  const handleLogoutClick = () => {
    // dispatch(logoutPharmacy());
    navigate(from, { replace: true });
  };
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="">My Medicines</NavLink>
        </li>
        <li>
          <NavLink to="">My Orders</NavLink>
        </li>
        <li>
          <NavLink to="">Settings</NavLink>
        </li>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.button
            onClick={handleLogoutClick}
            className={css.logoutButton}
          >
            <Logout className={css.logoutSvg} />
            <span>Log out</span>
          </motion.button>
        </motion.div>
      </ul>
    </nav>
  );
};

export default Links;
