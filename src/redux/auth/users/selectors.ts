import { RootState } from "../../store";

export const selectUserAccessToken = (state: RootState) =>
  state.usersAuth.token;

export const selectUserError = (state: RootState) => state.usersAuth.error;

export const selectUserLoading = (state: RootState) =>
  state.usersAuth.isLoading;

export const selectIsFetchingCurrentUser = (state: RootState) =>
  state.usersAuth.isFetchingCurrentUser;

export const selectIsUserLoggedIn = (state: RootState) =>
  state.usersAuth.isLoggedIn;

export const selectUserRoles = (state: RootState) => state.usersAuth.user.roles;

export const selectCurrentUser = (state: RootState) => state.usersAuth.user;
