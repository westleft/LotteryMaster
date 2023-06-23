import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/auth";
import networkSlice from "@/store/network";

const store = configureStore({
  reducer: { auth: authSlice, network: networkSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
