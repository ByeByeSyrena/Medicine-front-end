import React, { useState } from "react";
import ReactDOM from "react-dom";
import css from "./AuthSellerNav.module.css";
import { motion } from "framer-motion";
import ToggleButton from "./ToggleButton";
import Links from "./Links";
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <motion.div
          className={css.sidebar}
          animate={open ? "open" : "closed"}
          initial="closed"
        >
          <motion.div className={css.bg} variants={variants}>
            <ToggleButton onClick={handleToggle} />
            <Links />
          </motion.div>
        </motion.div>,
        portalRoot
      )}
    </>
  );
};

export default Sidebar;
