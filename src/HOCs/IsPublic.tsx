import { Navigate, useNavigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserAccessToken } from "../redux/auth/users/selectors";

type Props = {
  children: React.ReactNode;
};

const IsPublic: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useSelector(selectUserAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn !== "") {
      navigate("/shop");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn === "") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsPublic;
