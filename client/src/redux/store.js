import authreducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authreducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);
