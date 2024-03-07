import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { storesReducer } from "./stores/storesSlice";
import { ordersReducer } from "./orders/ordersSlice";
import { favoritesReducer } from "./favorites/favoritesSlice";

const persistConfig = {
  key: "persistedStates",
  storage,
  whitelist: ["stores", "cart", "totalPrice", "favorites"],
};

const rootReducer = combineReducers({
  orders: ordersReducer,
  stores: persistReducer(persistConfig, storesReducer),
  favorites: persistReducer(persistConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
