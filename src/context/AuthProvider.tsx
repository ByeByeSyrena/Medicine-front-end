import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshPharmTokens } from "../redux/auth/pharmacies/operations";
import {
  selectCurrentPharmacy,
  selectIsFetchingCurrentPharmacy,
} from "../redux/auth/pharmacies/selectors";
import { refreshUserTokens } from "../redux/auth/users/operations";
import {
  selectCurrentUser,
  selectIsFetchingCurrentUser,
} from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";

const AuthContext = createContext({});

//do not really use useAuth now, sorry YAGNI, leave it here
//in case I gonna need it in future,
//it`s just a pet project after all

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isFetchingCurrentUser = useSelector(selectIsFetchingCurrentUser);
  const isFetchingCurrentPharmacy = useSelector(
    selectIsFetchingCurrentPharmacy
  );
  const currentUser = useSelector(selectCurrentUser);
  const currentPharmacy = useSelector(selectCurrentPharmacy);

  useEffect(() => {
    dispatch(refreshUserTokens());
    dispatch(refreshPharmTokens());
  }, [dispatch]);

  if (isFetchingCurrentUser || isFetchingCurrentPharmacy) {
    return <div>Loading...</div>;
  }

  const contextValue = {
    user: currentUser,
    pharmacy: currentPharmacy,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
