import React from "react";
import css from "./Header.module.css";
import {
  useDispatch,
  // useSelector
} from "react-redux";
// import { selectIsUserLoggedIn } from "../../redux/auth/users/selectors";

import "./header.css";
// import NotAuthUserNav from "./NotAuthUserNav/NotAuthUserNav";
import AuthUserNav from "./AuthUserNav/AuthUserNav";
import { AppDispatch } from "../../redux/store";
import { refreshToken } from "../../redux/auth/users/operations";

export const Header = () => {
  // const isUserAccess = useSelector(selectIsUserLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const result = dispatch(refreshToken());
    console.log(result);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* {!isUserAccess && <NotAuthUserNav />} */}
        {/* {isUserAccess && */}
        <AuthUserNav />
        {/* } */}
        <button type="button" onClick={handleSubmit}>
          Refresh
        </button>
      </div>
    </header>
  );
};
