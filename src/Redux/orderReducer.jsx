import { createSlice } from "@reduxjs/toolkit";

const orderReducer = createSlice({
  name: "orderReducer",
  initialState: {
    searchResult: "",
  },
  reducers: {
    searchCandidate: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const { searchCandidate } = orderReducer.actions;
export default orderReducer.reducer;
