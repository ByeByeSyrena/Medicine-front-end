import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectFilterState = (state: RootState) => state.usersAuth;
export const selectCatalogState = (state: RootState) => state.pharmaciesAuth;

export const selectRoles = createSelector(
  [selectCatalogState, selectFilterState],
  (pharmacyState, userState) => {
    const allRoles = new Set([...pharmacyState.roles, ...userState.roles]);
    return Array.from(allRoles);
  }
);

export const selectUserOrPharmIsLoggedIn = createSelector(
  [selectCatalogState, selectFilterState],
  (pharmacyState, userState) => {
    return !!pharmacyState.pharmToken || !!userState.token;
  }
);
