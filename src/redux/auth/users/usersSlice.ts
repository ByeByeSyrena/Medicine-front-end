import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshUserTokens,
  updateUser,
} from "./operations";

export interface UsersState {
  user: User;
  isLoading: boolean;
  error: string | null;
  token: string;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
}

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
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user._id = payload.foundUser._id;
        state.user.name = payload.foundUser.name;
        state.user.email = payload.foundUser.email;
        state.user.roles = payload.foundUser.roles;
        state.user.favorites = payload.foundUser.favorites;
        state.user.seller = payload.foundUser.seller;
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
        state.user._id = "";
        state.user.name = "";
        state.user.email = "";
        state.user.roles = [];
        state.user.favorites = [];
        state.user.seller = null;
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(refreshUserTokens.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isFetchingCurrentUser = true;
      })
      .addCase(refreshUserTokens.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user._id = payload.foundUser._id;
        state.user.name = payload.foundUser.name;
        state.user.email = payload.foundUser.email;
        state.user.roles = payload.foundUser.roles;
        state.user.favorites = payload.foundUser.favorites;
        state.user.seller = payload.foundUser.seller;
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(refreshUserTokens.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload as string;
        state.isLoggedIn = false;
        state.isFetchingCurrentUser = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user._id = payload._id;
        state.user.name = payload.name;
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }),
});

export const usersReducer = usersSlice.reducer;
