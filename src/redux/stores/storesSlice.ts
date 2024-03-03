import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine, Pharmacy } from "../../@types/types";
import { getAllStores, getOneStore } from "./operations";
import { toast } from "react-toastify";

type initialStateTypes = {
  items: Pharmacy[];
  item: Pharmacy | null;
  cart: Medicine[];
  totalPrice: number;
  isLoading?: boolean;
  error?: string | null;
};

const catalogInitialState: initialStateTypes = {
  items: [],
  item: null,
  cart: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState: catalogInitialState,
  reducers: {
    addToCart(state, action: PayloadAction<Medicine>) {
      const newItem = action.payload;
      const price = parseFloat((newItem.price as string).substring(1));

      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (!existingItem) {
        state.cart.push({ ...newItem, price: price, amount: 1 });
      } else {
        (existingItem.amount as number)++;
        toast.info("Already added");
      }
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    increaseQuantity(state, action: PayloadAction<string | number>) {
      const itemId = action.payload;
      const item = state.cart.find((item) => item._id === itemId);
      if (item && typeof itemId === "number") {
        (item.amount as number)++;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string | number>) {
      const itemId = action.payload;
      const item = state.cart.find((item) => item._id === itemId);
      if (item && typeof itemId === "number") {
        (item.amount as number)--;
      }
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

export const {
  addToCart,
  deleteFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = storesSlice.actions;
