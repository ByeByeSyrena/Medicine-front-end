import { RootState } from "../store";

export const selectOrder = (state: RootState) => state.orders.order;

export const selectLoading = (state: RootState) => state.orders.isLoading;

export const selectError = (state: RootState) => state.orders.error;
