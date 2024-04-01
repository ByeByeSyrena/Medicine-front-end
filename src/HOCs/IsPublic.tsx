import { useNavigate } from "react-router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserAccessToken } from "../redux/auth/users/selectors";
import {
  selectCurrentPharmacy,
  selectIsPharmLoggedIn,
} from "../redux/auth/pharmacies/selectors";

type Props = {
  children: React.ReactNode;
};

const IsPublic: React.FC<Props> = ({ children }) => {
  const isUserLoggedIn = useSelector(selectUserAccessToken);
  const isPharmLoggedIn = useSelector(selectIsPharmLoggedIn);
  const pharmID = useSelector(selectCurrentPharmacy);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn !== "") {
      navigate("/shop");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    if (isPharmLoggedIn) {
      navigate(`/seller-settings/${pharmID._id}`);
    }
  }, [isPharmLoggedIn, navigate]);

  if (isUserLoggedIn === "" || isPharmLoggedIn === "") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsPublic;
