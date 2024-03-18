import React from "react";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";

const IsGeneral = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsUserLoggedIn);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return <>{isLoggedIn ? <Outlet /> : <Outlet />}</>;
};

export default IsGeneral;
