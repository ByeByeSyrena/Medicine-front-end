import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pharmacy } from "../../@types/types";

axios.defaults.baseURL = "http://localhost:3001";

// axios.defaults.baseURL = "https://medicine-backend-2.onrender.com/";

export const getAllStores = createAsyncThunk<Pharmacy[]>(
  "stores/fetchStores",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Pharmacy[]> = await axios.get(
        "/pharmacies"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOneStore = createAsyncThunk<Pharmacy, string>(
  "stores/fetchOneStore",
  async (id, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Pharmacy> = await axios.get(
        `/pharmacies/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
