import authreducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

// store.js


// Configuring the store
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
