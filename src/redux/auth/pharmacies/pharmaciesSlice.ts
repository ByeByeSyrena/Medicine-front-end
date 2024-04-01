import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ApiError, Pharmacy } from "../../../@types/types";
import {
  createPharmacy,
  loginPharmacy,
  refreshPharmTokens,
} from "./operations";

export interface PharmacyState {
  pharmacy: Pharmacy;
  isLoading: boolean;
  error: ApiError | null;
  pharmToken: string;
  isLoggedIn: boolean;
  isFetchingCurrentPharmacy: boolean;
}

const handlePending = (state: PharmacyState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: PharmacyState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState: PharmacyState = {
  isLoading: false,
  error: null,
  pharmacy: {
    _id: "",
    name: "",
    email: "",
    roles: [],
    createdAt: "",
    updatedAt: "",
  },
  pharmToken: "",
  isLoggedIn: false,
  isFetchingCurrentPharmacy: false,
};

const pharmaciesSlice = createSlice({
  name: "pharmacyAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createPharmacy.fulfilled, (state, _) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginPharmacy.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.pharmacy = { ...state.pharmacy, ...payload.foundPharmacy };
        state.pharmToken = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshPharmTokens.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.pharmacy = { ...state.pharmacy, ...payload.foundPharmacy };
        state.pharmToken = payload.accessToken;
        state.isLoggedIn = true;
        state.isFetchingCurrentPharmacy = false;
      })
      .addCase(refreshPharmTokens.pending, (state) => {
        state.isFetchingCurrentPharmacy = true;
      })
      .addCase(refreshPharmTokens.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isFetchingCurrentPharmacy = false;
      })
      .addMatcher(
        isAnyOf(
          createPharmacy.pending,
          loginPharmacy.pending,
          refreshPharmTokens.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          createPharmacy.rejected,
          loginPharmacy.rejected,
          refreshPharmTokens.rejected
        ),
        handleRejected
      ),
});

export const pharmaciesReducer = pharmaciesSlice.reducer;
