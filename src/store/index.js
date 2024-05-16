import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice";
import thunk from "redux-thunk";
import propertiesSlice from "./properties/propertiesSlice";
import settingSlice from "./settings/settingSlice";
import categoriesSlice from "./categories/categoriesSlice";
import ordersSlice from "./orders/ordersSlice";

const reducers = combineReducers({
  auth: authSlice,
  properties: propertiesSlice,
  settings: settingSlice,
  categories: categoriesSlice,
  allOrders: ordersSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
