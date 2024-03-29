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

      const exist = state.cart.find(
        (item) =>
          item.item === newItem.item && item.quantity === newItem.quantity
      );

      if (!exist) {
        state.cart.push({ ...newItem, price: price, amount: 1 });
      } else if (exist) {
        (exist.amount as number)++;
        toast.info("Already added, go to the cart for the next steps");
      }
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },
    increaseQuantity(state, action: PayloadAction<string | number>) {
      const itemId = action.payload;
      const itemIndex = state.cart.findIndex((item) => item._id === itemId);
      state.cart[itemIndex] = {
        ...state.cart[itemIndex],
        amount: (state.cart[itemIndex].amount as number) + 1,
      };
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    decreaseQuantity(state, action: PayloadAction<string | number>) {
      const itemId = action.payload;
      const itemIndex = state.cart.findIndex((item) => item._id === itemId);
      if ((state.cart[itemIndex].amount as number) > 1) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          amount: (state.cart[itemIndex].amount as number) - 1,
        };
      }
      state.totalPrice = calculateTotalPrice(state.cart);
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

// Utility function to calculate total price
const calculateTotalPrice = (cart: Medicine[]) => {
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price as number) * (item.amount as number),
    0
  );
  return parseFloat(totalPrice.toFixed(2));
};
