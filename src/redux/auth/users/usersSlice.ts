import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ApiError, User } from "../../../@types/types";
import {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshUserTokens,
  updateUser,
} from "./operations";

export interface UsersState {
  user: User;
  isLoading: boolean;
  error: ApiError | null;
  token: string;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
}

const handlePending = (state: UsersState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: UsersState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState: UsersState = {
  isLoading: false,
  error: null,
  user: {
    _id: "",
    name: "",
    email: "",
    roles: [],
    favorites: [],
    seller: null,
  },
  token: "",
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const usersSlice = createSlice({
  name: "usersAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createUser.fulfilled, (state, _) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = { ...state.user, ...payload.foundUser };
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
        state.user = initialState.user;
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
        state.user = initialState.user;
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(refreshUserTokens.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = { ...state.user, ...payload.foundUser };
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user.roles = payload.roles;
        state.user.name = payload.name;
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshUserTokens.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(refreshUserTokens.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isFetchingCurrentUser = false;
      })
      .addMatcher(
        isAnyOf(
          createUser.pending,
          loginUser.pending,
          logoutUser.pending,
          refreshUserTokens.pending,
          updateUser.pending,
          deleteUser.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          createUser.rejected,
          loginUser.rejected,
          logoutUser.rejected,
          refreshUserTokens.rejected,
          updateUser.rejected,
          deleteUser.rejected
        ),
        handleRejected
      ),
});

export const usersReducer = usersSlice.reducer;
