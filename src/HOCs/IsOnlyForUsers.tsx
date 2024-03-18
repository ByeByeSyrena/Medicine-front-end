import { Outlet } from "react-router-dom";
import { useLocation, Navigate, useNavigate } from "react-router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";

const IsOnlyForUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isLoggedIn = useSelector(selectIsUserLoggedIn);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return <>{isLoggedIn && <Outlet />}</>;
};

export default IsOnlyForUsers;
