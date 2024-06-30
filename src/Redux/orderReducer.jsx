import { createSlice } from "@reduxjs/toolkit";

const orderReducer = createSlice({
  name: "orderReducer",
  initialState: {
    searchResult: "",
    tabId: "",
  },
  reducers: {
    searchCandidate: (state, action) => {
      state.searchResult = action.payload;
    },
    changeTabId: () => {
      state.tabId = action.payload;
    },
  },
});

export const { searchCandidate, changeTabId } = orderReducer.actions;
export default orderReducer.reducer;
