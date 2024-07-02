import { createSlice } from "@reduxjs/toolkit";

const orderReducer = createSlice({
  name: "orderReducer",
  initialState: {
    searchResult: "",
    tabId: 1,
    isAcceptModalOpen: false,
    selectedItem: null, // Track selected item to update
  },
  reducers: {
    searchCandidate: (state, action) => {
      state.searchResult = action.payload;
    },
    changeTabId: (state, action) => {
      state.tabId = action.payload;
    },
    showModal: (state, action) => {
      state.isAcceptModalOpen = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    updateStatus: (state, action) => {
      if (state.selectedItem) {
        state.selectedItem.status = "New";
        console.log("Updating backend with new status:", state.selectedItem);
        state.selectedItem = null;
      }
    },
  },
});

export const {
  searchCandidate,
  changeTabId,
  showModal,
  setSelectedItem,
  updateStatus,
} = orderReducer.actions;
export default orderReducer.reducer;
