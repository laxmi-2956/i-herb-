import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice" 
import cartReducer from "./slice/cartSlice"

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ auth: authReducer,cart:cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor= persistStore(store);