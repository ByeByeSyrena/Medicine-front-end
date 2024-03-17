import { RootState } from "../../store";

export const selectUserAccessToken = (state: RootState) =>
  state.usersAuth.token;

export const selectUserError = (state: RootState) => state.usersAuth.error;

export const selectIsFetchingCurrentUser = (state: RootState) =>
  state.usersAuth.isFetchingCurrentUser;

export const selectIsUserLoggedIn = (state: RootState) =>
  state.usersAuth.isLoggedIn;

export const selectUserRoles = (state: RootState) => state.usersAuth.user.roles;
