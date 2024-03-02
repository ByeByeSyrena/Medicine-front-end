import { RootState } from "../store";

export const selectAllStores = (state: RootState) => state.stores.items;

export const selectOneStore = (state: RootState) => state.stores.item;

export const selectLoading = (state: RootState) => state.stores.isLoading;

export const selectError = (state: RootState) => state.stores.error;
