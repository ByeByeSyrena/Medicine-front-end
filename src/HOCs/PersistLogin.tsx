import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { refreshToken } from "../redux/auth/users/operations";
import {
  selectIsUserLoggedIn,
  selectUserAccessToken,
  selectUserLoading,
} from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";

const PersistLogin = () => {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);
  const isLoading = useSelector(selectUserLoading);
  const token = useSelector(selectUserAccessToken);

  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(refreshToken());
  //   }
  // }, [dispatch, isLoggedIn, token]);

  return (
    <>{!isLoggedIn ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
