import { accessToken } from "../../apiSettings/tokenSettings";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginUser,
  RegUser,
  ApiError,
  ReturnedUser,
} from "../../../@types/types";

import {
  createUserRequest,
  loginUserRequest,
  logoutUserRequest,
  refreshTokensRequest,
  updateUserRequest,
} from "./services";
import { checkAndSetPersistedToken } from "../../apiSettings/checkAndSetPersistedToken";
import { initialUpdateUserTypes } from "../../../pages/userUtilities/SettingsPage/SettingsPage";
import { toast } from "react-toastify";

export const createUser = createAsyncThunk(
  "usersAuth/createUser",
  async (formData: RegUser, { rejectWithValue }) => {
    try {
      const response = await createUserRequest(formData);

      if (response.status === 201) {
        return toast.info("User was created successfully!");
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.payload);
    }
  }
);

export const loginUser = createAsyncThunk<
  ReturnedUser,
  LoginUser,
  {
    rejectValue: ApiError;
  }
>("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await loginUserRequest(formData);

    accessToken.setToken(response.data.accessToken);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    } else {
      return rejectWithValue({
        status: 500,
        message: "An unknown error occurred",
      });
    }
  }
});

export const logoutUser = createAsyncThunk(
  "usersAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserRequest();
      accessToken.unsetToken();
      return;
    } catch (error) {
      return rejectWithValue((error as any).payload);
    }
  }
);

export const refreshUserTokens = createAsyncThunk<
  ReturnedUser,
  void,
  {
    rejectValue: ApiError;
  }
>("auth/refresh", async (_, { rejectWithValue, getState }) => {
  const persistedToken = (getState() as any).usersAuth.token;
  checkAndSetPersistedToken(persistedToken);
  try {
    const response = await refreshTokensRequest();
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    } else {
      return rejectWithValue({
        status: 500,
        message: "An unknown error occurred",
      });
    }
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    {
      userId,
      userData,
    }: { userId: string; userData: Partial<initialUpdateUserTypes> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserRequest(userId, userData);
      accessToken.setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).payload);
    }
  }
);
