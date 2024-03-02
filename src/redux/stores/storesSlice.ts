import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine, Pharmacy } from "../../@types/types";
import { getAllStores, getOneStore } from "./operations";

type initialStateTypes = {
  items: Pharmacy[];
  item: Pharmacy | null;
  cart: Medicine[];
  isLoading?: boolean;
  error?: string | null;
};

const catalogInitialState: initialStateTypes = {
  items: [],
  item: null,
  cart: [],
  isLoading: false,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState: catalogInitialState,
  reducers: {
    addToCart(state, action: PayloadAction<Medicine>) {
      state.cart.push(action.payload);
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })
      .addCase(getOneStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOneStore.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOneStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }),
});

export const storesReducer = storesSlice.reducer;

export const { addToCart, deleteFromCart } = storesSlice.actions;
