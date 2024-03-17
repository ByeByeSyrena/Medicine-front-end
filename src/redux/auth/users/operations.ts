import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../@types/types";
import { requestRegister } from "./services";
// import { UsersState } from "./usersSlice";
import { useSelector } from "react-redux";
import { selectUserAccessToken } from "./selectors";
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

interface UserData {
  foundUser: foundUser;

  accessToken: string;
}

// axios.defaults.baseURL = "http://localhost:3001/api/v1";

axios.defaults.baseURL = "https://medicine-backend-2.onrender.com/api/v1";

const token = {
  setToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;
  },
  unsetToken() {
    axios.defaults.headers.common.Authorization = "";
    delete axios.defaults.headers.common["Content-Type"];
    axios.defaults.withCredentials = false;
  },
};

export const createUser = createAsyncThunk<User, User>(
  "usersAuth/createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await requestRegister(formData);
      console.log(response);
      return response;
    } catch (error) {
      toast.info("Registration failed");
      return rejectWithValue((error as any).payload);
    }
  }
);

export const loginUser = createAsyncThunk<UserData, User>(
  "auth/login",
  async (formatData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", formatData);
      token.setToken(response.data.accessToken);

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
      await axios.get("/users/logout");
      token.unsetToken();
    } catch (error) {
      toast.info("Logout failed");

      return rejectWithValue((error as any).payload);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    const persistedToken = useSelector(selectUserAccessToken);
    if (!persistedToken) {
      return rejectWithValue("No saved token. Please log in.");
    }
    token.setToken(persistedToken);
    try {
      const { data } = await axios.get("/users/refresh");
      return data;
    } catch (error) {
      toast.info("Access denied");

      return rejectWithValue((error as any).payload);
    }
  }
);
