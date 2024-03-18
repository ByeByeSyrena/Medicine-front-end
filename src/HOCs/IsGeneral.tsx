import React from "react";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsUserLoggedIn,
  selectUserAccessToken,
} from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";

const IsGeneral = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  //   //   const isLoggedIn = useSelector(selectIsUserLoggedIn);
  //   const haveAccess = useSelector(selectUserAccessToken);
  //   useEffect(() => {
  //     if (haveAccess) {
  //       dispatch(refreshToken());
  //     }
  //   }, []);
  //   return <Outlet />;
};

export default IsGeneral;
