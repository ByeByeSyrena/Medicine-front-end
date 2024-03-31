import React from "react";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../redux/auth/users/selectors";

import NotAuthUserNav from "./NotAuthUserNav/NotAuthUserNav";
import AuthUserNav from "./AuthUserNav/AuthUserNav";

export const Header = () => {
  const isUserAccess = useSelector(selectIsUserLoggedIn);

  return (
    <header className={css.header}>
      {!isUserAccess && <NotAuthUserNav />}
      {isUserAccess && <AuthUserNav />}
    </header>
  );
};
