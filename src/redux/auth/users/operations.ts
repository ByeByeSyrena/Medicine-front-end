import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import { requestRegister } from "./services";
import { useSelector } from "react-redux";
import { selectRegisterUser } from "./selectors";

axios.defaults.baseURL = "http://localhost:3001/api/v1";

// axios.defaults.baseURL = "https://medicine-backend-2.onrender.com/api/v1";

// const token = {
//   setToken(token: string) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unsetToken() {
//     axios.defaults.headers.common.Authorization = "";
//   },
// };

export const createUser = createAsyncThunk<User, User>(
  "usersAuth/createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await requestRegister(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "usersAuth/loginUser",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response: AxiosResponse<User> = await requestLogin(formData);
//       // token.setToken(response.data.token as string);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const loginUser = createAsyncThunk<User, User>(
  "auth/login",
  async (formatData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", formatData);
      // token.setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "usersAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/users/logout");
      // token.unsetToken();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = useSelector(selectRegisterUser);
    if (!persistedToken) {
      return rejectWithValue("No saved token. Please log in.");
    }
    // token.setToken(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
