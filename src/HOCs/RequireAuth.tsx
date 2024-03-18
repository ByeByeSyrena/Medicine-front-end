import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router";
import {
  selectIsUserLoggedIn,
  selectUserRoles,
} from "../redux/auth/users/selectors";

type Props = {
  allowedRoles: string[];
};

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRoles = useSelector(selectUserRoles);

  const allowed = userRoles.find((role: string) =>
    allowedRoles?.includes(role)
  );

  useEffect(() => {
    if (isLoggedIn && !allowed) {
      navigate(from, { replace: true });
    }
  }, [navigate, isLoggedIn, allowed, from]);

  if (isLoggedIn && allowed) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
