import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_LIST } from "../../../config";

const initialState = {
  tokenList: TOKEN_LIST,
  exchanges: [],
  isNoFilledPools: false,
};

const liquiditySlice = createSlice({
  name: "swapMaster",
  initialState,
  reducers: {
    setExchanges: (state, action) => {
      state.exchanges = action.payload;
    },
    clearExchanges: state => {
      state.exchanges = initialState.exchanges;
      state.isNoFilledPools = initialState.isNoFilledPools;
    },
    setIsNoFilledPools: (state, action) => {
      state.isNoFilledPools = action.payload;
    },
  },
});

export const { setExchanges, clearExchanges, setIsNoFilledPools } = liquiditySlice.actions;

export default liquiditySlice.reducer;
