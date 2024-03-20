import { useLocation, Navigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectUserAccessToken,
  selectUserRoles,
} from "../redux/auth/users/selectors";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const IsPublic: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useSelector(selectUserAccessToken);

  useEffect(() => {
    if (isLoggedIn !== "") {
      navigate("/shop");
    }
  }, [isLoggedIn]);

  const navigate = (path: string) => {
    return <Navigate to={path} replace />;
  };

  if (isLoggedIn === "") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsPublic;
