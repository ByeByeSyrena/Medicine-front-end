import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine } from "../../@types/types";

type favoritesTypes = {
  items: Medicine[];
  error: string | null;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    error: null,
  } as favoritesTypes,
  reducers: {
    // clearFavoritesState(state) {
    //   state.items = [];
    //   state.error = null;
    // },
    // addFavorites(state, action: PayloadAction<Medicine>) {
    //   state.items.push(action.payload);
    // },
    // deleteFavorites(state, action: PayloadAction<string>) {
    //   state.items = state.items.filter((item) => item._id !== action.payload);
    // },
  },
});
export const favoritesReducer = favoritesSlice.reducer;

// export const { clearFavoritesState, addFavorites, deleteFavorites } =
//   favoritesSlice.actions;
