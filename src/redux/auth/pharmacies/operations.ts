import { accessToken } from "../../apiSettings/tokenSettings";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../apiSettings/apiErrorHandler";
import { toast } from "react-toastify";
import { LoginUser, RegUser, ReturnedPharmacy } from "../../../@types/types";
import {
  createPharmacyRequest,
  loginPharmRequest,
  refreshTokensRequest,
} from "./services";
import { checkAndSetPersistedToken } from "../../apiSettings/checkAndSetPersistedToken";

export const createPharmacy = createAsyncThunk(
  "pharmacyAuth/createPharmacy",
  async (formData: RegUser, { rejectWithValue }) => {
    try {
      const response = await createPharmacyRequest(formData);

      if (response.status === 201) {
        return toast.info("Pharmacy was created successfully!");
      }

      return response.data;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const loginPharmacy = createAsyncThunk(
  "pharmacyAuth/login",
  async (formData: LoginUser, { rejectWithValue }) => {
    try {
      const response = await loginPharmRequest(formData);

      accessToken.setToken(response.data.accessToken);

      return response.data as ReturnedPharmacy;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);

export const refreshPharmTokens = createAsyncThunk(
  "pharmacyAuth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const persistedToken = (getState() as any).pharmaciesAuth.pharmToken;
    checkAndSetPersistedToken(persistedToken);
    try {
      const response = await refreshTokensRequest();
      return response.data as ReturnedPharmacy;
    } catch (error) {
      const errorObj = handleApiError(error);
      return rejectWithValue(errorObj);
    }
  }
);
