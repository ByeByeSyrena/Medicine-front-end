import { RootState } from "../../store";

export const selectRegisterUser = (state: RootState) => state.usersAuth.token;

export const selectUserError = (state: RootState) => state.usersAuth.error;
