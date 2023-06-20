import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/auth";
import networkSlice from "@/store/network";

const store = configureStore({
  reducer: { auth: authSlice, network: networkSlice },
});

export default store;
