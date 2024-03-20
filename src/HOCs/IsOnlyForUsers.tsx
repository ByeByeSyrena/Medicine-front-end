import { useLocation, Navigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectUserAccessToken,
  selectUserRoles,
} from "../redux/auth/users/selectors";
import { toast } from "react-toastify";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const IsOnlyForUsers: React.FC<Props> = ({ children, allowedRoles }) => {
  const isLoggedIn = useSelector(selectUserAccessToken);
  const userRoles = useSelector(selectUserRoles);

  const allowed = userRoles.some((role: string) =>
    allowedRoles?.includes(role)
  );

  useEffect(() => {
    if (isLoggedIn !== "" && !allowed) {
      toast.info("You shall not pass");
      navigate("/shop");
    } else if (!isLoggedIn && allowed) {
      toast.info("You shall not pass");
      navigate("/login");
    }
  }, [isLoggedIn, allowed]);

  const navigate = (path: string) => {
    return <Navigate to={path} replace />;
  };

  if (isLoggedIn !== "" && allowed) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsOnlyForUsers;
