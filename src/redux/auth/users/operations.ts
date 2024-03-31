import { accessToken } from "../../apiSettings/tokenSettings";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginUser,
  RegUser,
  ApiError,
  ReturnedUser,
  UpdatedUser,
} from "../../../@types/types";

import {
  createUserRequest,
  deleteUserRequest,
  loginUserRequest,
  logoutUserRequest,
  refreshTokensRequest,
  updateUserRequest,
} from "./services";
import { checkAndSetPersistedToken } from "../../apiSettings/checkAndSetPersistedToken";
import { toast } from "react-toastify";
import { handleApiError } from "../../apiSettings/apiErrorHandler";

export const createUser = createAsyncThunk(
  "usersAuth/createUser",
  async (formData: RegUser, { rejectWithValue }) => {
    try {
      const response = await createUserRequest(formData);

      if (response.status === 201) {
        return toast.info("User was created successfully!");
      }

      return response.data;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: LoginUser, { rejectWithValue }) => {
    try {
      const response = await loginUserRequest(formData);

      accessToken.setToken(response.data.accessToken);

      return response.data as ReturnedUser;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "usersAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserRequest();
      accessToken.unsetToken();
      return;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "usersAuth/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteUserRequest(userId);
      accessToken.unsetToken();
      return;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const refreshUserTokens = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const persistedToken = (getState() as any).usersAuth.token;
    checkAndSetPersistedToken(persistedToken);
    try {
      const response = await refreshTokensRequest();
      return response.data as ReturnedUser;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    {
      userId,
      userData,
    }: { userId: string; userData: { name?: string; password?: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserRequest(userId, userData);
      accessToken.setToken(response.data.accessToken);
      return response.data as UpdatedUser;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);
