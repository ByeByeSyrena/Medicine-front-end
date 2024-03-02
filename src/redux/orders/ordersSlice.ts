import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../@types/types";
import { createOrder } from "./operations";

interface OrdersState {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  order: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }),
});

export const ordersReducer = ordersSlice.reducer;
