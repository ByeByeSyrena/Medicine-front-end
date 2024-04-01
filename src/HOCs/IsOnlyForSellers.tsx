import { Navigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  selectPharmAccessToken,
  selectPharmRole,
} from "../redux/auth/pharmacies/selectors";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const IsOnlyForSellers: React.FC<Props> = ({ children, allowedRoles }) => {
  const isLoggedIn = useSelector(selectPharmAccessToken);
  const sellersRoles = useSelector(selectPharmRole);

  const allowed = sellersRoles.some((role: string) =>
    allowedRoles?.includes(role)
  );

  useEffect(() => {
    if (isLoggedIn !== "" && !allowed) {
      toast.info("You shall not pass");
      navigate("/shop");
    } else if (!isLoggedIn && allowed) {
      toast.info("Please authorize");
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

export default IsOnlyForSellers;
