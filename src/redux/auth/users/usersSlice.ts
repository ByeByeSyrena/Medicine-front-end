import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import { createUser, loginUser, logoutThunk, refreshToken } from "./operations";

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
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
        state.user.name = "";
        state.user.email = "";
        state.user.roles = [];
        state.user.favorites = [];
        state.user.seller = null;
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload as string;
        state.isLoggedIn = false;
      }),
});

export const usersReducer = usersSlice.reducer;
