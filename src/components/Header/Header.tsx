import React from "react";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectUserAccessToken } from "../../redux/auth/users/selectors";

import NotAuthUserNav from "./NotAuthUserNav/NotAuthUserNav";
import AuthUserNav from "./AuthUserNav/AuthUserNav";

export const Header = () => {
  const isUserAccess = useSelector(selectUserAccessToken);

  return (
    <header className={css.header}>
      <div className={css.container}>
        {!isUserAccess && <NotAuthUserNav />}
        {isUserAccess && <AuthUserNav />}
      </div>
    </header>
  );
};
