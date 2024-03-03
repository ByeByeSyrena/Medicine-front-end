import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../@types/types";

axios.defaults.baseURL = "https://medicine-backend-2.onrender.com/";

export const createOrder = createAsyncThunk<Order, Order>(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);