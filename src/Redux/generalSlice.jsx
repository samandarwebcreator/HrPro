import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    sidebarOpen: true,
  },
  reducers: {
    wideSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { wideSidebar } = generalSlice.actions;
export default generalSlice.reducer;
