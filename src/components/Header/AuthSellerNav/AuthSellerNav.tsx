import React, { useState } from "react";
import css from "./AuthSellerNav.module.css";
import Sidebar from "./Sidebar";

const AuthSellerNav: React.FC = () => {
  return (
    <div className={css.navLayout}>
      <Sidebar />
    </div>
  );
};

export default AuthSellerNav;
