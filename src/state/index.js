import { combineReducers } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "./user";
import { configureStore } from "@reduxjs/toolkit";
import rickMorty from "./rickMorty";

// REDUCERS
const reducers = combineReducers({
  user,
  rickMorty,
});

// PERSISTENCE CONFIG
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// STORE
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
