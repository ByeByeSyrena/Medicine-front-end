import { RootState } from "../../store";

export const selectPharmAccessToken = (state: RootState) =>
  state.pharmaciesAuth.pharmToken;

export const selectPharmError = (state: RootState) =>
  state.pharmaciesAuth.error;

export const selectPharmLoading = (state: RootState) =>
  state.pharmaciesAuth.isLoading;

export const selectIsFetchingCurrentPharmacy = (state: RootState) =>
  state.pharmaciesAuth.isFetchingCurrentPharmacy;

export const selectIsPharmLoggedIn = (state: RootState) =>
  state.pharmaciesAuth.isLoggedIn;

export const selectPharmRole = (state: RootState) =>
  state.pharmaciesAuth.pharmacy.roles;

export const selectPharmId = (state: RootState) =>
  state.pharmaciesAuth.pharmacy._id;

export const selectCurrentPharmacy = (state: RootState) =>
  state.pharmaciesAuth.pharmacy;
