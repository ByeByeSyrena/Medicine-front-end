import { Navigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  selectRoles,
  selectUserOrPharmIsLoggedIn,
} from "../redux/commonHelpers/jointSelectors";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const IsOnlyForAdminsAndModerators: React.FC<Props> = ({
  children,
  allowedRoles,
}) => {
  const isLoggedIn = useSelector(selectUserOrPharmIsLoggedIn);
  const pharmRoles = useSelector(selectRoles);

  const allowed = pharmRoles.some((role: string) =>
    allowedRoles?.includes(role)
  );

  useEffect(() => {
    if (isLoggedIn && !allowed) {
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

  if (isLoggedIn && allowed) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsOnlyForAdminsAndModerators;
