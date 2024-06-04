import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    sidebarOpen: window.innerWidth < 1100 ? false : true,
  },
  reducers: {
    wideSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { wideSidebar } = generalSlice.actions;
export default generalSlice.reducer;
