import React from "react";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../redux/auth/users/selectors";

import NotAuthUserNav from "./NotAuthUserNav/NotAuthUserNav";
import AuthUserNav from "./AuthUserNav/AuthUserNav";
import AuthSellerNav from "./AuthSellerNav/AuthSellerNav";
import { selectIsPharmLoggedIn } from "../../redux/auth/pharmacies/selectors";

export const Header = () => {
  const isUserAccess = useSelector(selectIsUserLoggedIn);
  const isPharmAccess = useSelector(selectIsPharmLoggedIn);

  return (
    <header className={css.header}>
      {!isUserAccess && !isPharmAccess && <NotAuthUserNav />}
      {isUserAccess && <AuthUserNav />}
      {!isUserAccess && isPharmAccess && <AuthSellerNav />}
    </header>
  );
};
