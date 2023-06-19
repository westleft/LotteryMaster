import { createSlice } from "@reduxjs/toolkit";
import { counterActions } from "@/store/counter"
const initState = { isLogin: false, walletAddress: "0x" };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    loginInit(state, actions) {
      const { isLogin, walletAddress } = actions.payload;
      state.isLogin = isLogin;
      state.walletAddress = walletAddress;      
    }
  },
});

export const add = () => {
  return (dispatch) => {
    dispatch(counterActions.increment())
  }
}

export const authActions = authSlice.actions;

export default authSlice.reducer;
