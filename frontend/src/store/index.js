import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/store/counter";
import authSlice from "@/store/auth";
import networkSlice from "@/store/network";

const store = configureStore({
  reducer: { counter: counterSlice, auth: authSlice, network: networkSlice },
});

export default store;
