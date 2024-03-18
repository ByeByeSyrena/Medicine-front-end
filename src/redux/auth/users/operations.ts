import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";

import { toast } from "react-toastify";

interface foundUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  seller?: string;
}

interface regUser {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  foundUser: foundUser;

  accessToken: string;
}

interface createAnswer {
  user: regUser;
  message: string;
}
axios.defaults.baseURL = "http://localhost:3001/api/v1";

// axios.defaults.baseURL = "https://medicine-backend-2.onrender.com/api/v1";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

const token = {
  setToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unsetToken() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true;
};

axios.interceptors.response.use(
  (response) => {
    if (response.headers["set-cookie"]) {
      const cookies = response.headers["set-cookie"];
      const jwtCookie = cookies.find((cookie: string) =>
        cookie.includes("jwt=")
      );

      if (jwtCookie) {
        const token = jwtCookie.split("jwt=")[1].split(";")[0];
        setAuthToken(token);
      }
    }
    return response;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

export const createUser = createAsyncThunk(
  "usersAuth/createUser",
  async (formData: regUser, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<createAnswer> = await axios.post(
        "/users/register",
        formData,
        {}
      );
      console.log(response);

      if (response?.status === 201) {
        toast.info("User created");
      }

      const responseData = {
        data: response.data,
        headers: {
          "content-type": response.headers["content-type"],
        },
      };
      return responseData;
    } catch (error) {
      toast.info("Registration failed");
      return rejectWithValue((error as any).payload);
    }
  }
);

export const loginUser = createAsyncThunk<UserData, User>(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", formData);
      token.setToken(response.data.accessToken);
      console.log(response);

      return response.data;
    } catch (error) {
      toast.info("Login failed");
      return rejectWithValue((error as any).payload);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "usersAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await refreshToken();
      await axios.get("/users/logout");

      token.unsetToken();

      return;
    } catch (error) {
      toast.info("Logout failed");
      return rejectWithValue((error as any).payload);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const persistedToken = (getState() as any).usersAuth.token;
    if (!persistedToken) {
      return rejectWithValue("No saved token. Please log in.");
    }
    token.setToken(persistedToken);
    try {
      const { data } = await axios.get("/users/refresh");
      console.log(data);
      return data;
    } catch (error) {
      toast.info("Access denied");

      return rejectWithValue((error as any).payload);
    }
  }
);
