import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/store/counter"
import authSlice from "@/store/auth"

const store = configureStore({
  reducer: { counter: counterSlice, auth: authSlice}
});

export default store;
