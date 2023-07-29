import { createSlice } from "@reduxjs/toolkit";

const initState = { chainId: "" };

const networkSlice = createSlice({
  name: "network",
  initialState: initState,
  reducers: {
    changeChainId(state, actions) {
      // console.log("change", actions.payload);
      state.chainId = actions.payload;
    },
  },
});

export const networkActions = networkSlice.actions;

export default networkSlice.reducer;
