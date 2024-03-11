import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import { createUser, loginUser, logoutThunk } from "./operations";

interface UsersState {
  user: User;
  isLoading: boolean;
  error: string | null;
  token: string;
  isFetchingCurrentUser: boolean;
}

const initialState: UsersState = {
  isLoading: false,
  error: null,
  user: {
    name: "",
    email: "",
    password: "",
    role: "",
    favorites: [],
    seller: "",
  },
  token: "",
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
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.user.favorites = action.payload.favorites;
        state.user.seller = action.payload.seller;
        state.token = action.payload.token as string;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload as string;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.user = {
          name: "",
          email: "",
          password: "",
          role: "",
          favorites: [],
          seller: "",
          token: "",
        };
        state.token = "";
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      }),
});

export const usersReducer = usersSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginThunk,
//   logoutThunk,
//   refreshThunk,
//   registerThunk,
// } from "./operations";

// const authInitialState = {
//   isLoading: false,
//   error: null,
//   user: {
//     name: "",
//     email: "",
//   },
//   token: "",
//   isFetchingCurrentUser: false,
// };

// const authSlice = createSlice({
//   name: "auth/register",
//   initialState: authInitialState,
//   extraReducers: (builder) =>
//     builder
//       .addCase(registerThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerThunk.fulfilled, (state, { payload }) => {
//         state.error = null;
//         state.isLoading = false;
//         state.user = payload.user;
//         state.token = payload.token;
//       })
//       .addCase(registerThunk.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.isLoading = false;
//       })
//       .addCase(loginThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginThunk.fulfilled, (state, { payload }) => {
//         state.error = null;
//         state.isLoading = false;
//         state.user = payload.user;
//         state.token = payload.token;
//       })
//       .addCase(loginThunk.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.isLoading = false;
//       })
//       .addCase(logoutThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logoutThunk.fulfilled, (state, { payload }) => {
//         state.error = null;
//         state.isLoading = false;
//         state.user = { name: "", email: "" };
//         state.token = "";
//       })
//       .addCase(logoutThunk.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.isLoading = false;
//       })
//       .addCase(refreshThunk.pending, (state) => {
//         state.isLoading = true;
//         state.isFetchingCurrentUser = true;
//       })
//       .addCase(refreshThunk.fulfilled, (state, { payload }) => {
//         state.error = null;
//         state.isLoading = false;
//         state.user = payload;
//         state.isFetchingCurrentUser = false;
//       })
//       .addCase(refreshThunk.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.isLoading = false;
//         state.isFetchingCurrentUser = false;
//       }),
// });

// export const authReducer = authSlice.reducer;
