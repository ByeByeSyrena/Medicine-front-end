import { Outlet } from "react-router-dom";
import { useLocation, Navigate, useNavigate } from "react-router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAccessToken } from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";

const PersistLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isLoggedIn = useSelector(selectUserAccessToken);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch, refreshToken]);

  return <>{isLoggedIn && <Outlet />}</>;
};

export default PersistLogin;
