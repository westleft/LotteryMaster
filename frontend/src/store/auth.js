import { createSlice } from "@reduxjs/toolkit";

const initState = { isLogin: false, address: "0x" };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
