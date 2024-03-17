import React from "react";
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

  if (isLoggedIn && allowed) {
    return <Outlet />;
  } else if (isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
