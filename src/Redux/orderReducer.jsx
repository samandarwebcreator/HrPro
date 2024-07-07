import { createSlice } from "@reduxjs/toolkit";

const orderReducer = createSlice({
  name: "orderReducer",
  initialState: {
    searchResult: "",
    tabId: 1,
    isAcceptModalOpen: false,
    selectedItem: null,
    newApplicants: [],
    inProcess: [],
    onMeeting: [],
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
    setNewApplicant: (state, action) => {
      const newIds = new Set(state.newApplicants.map((item) => item.id));
      state.newApplicants = [
        ...state.newApplicants,
        ...action.payload.filter((item) => !newIds.has(item.id)),
      ];
    },
    setInProcess: (state, action) => {
      const inProcessIds = new Set(state.inProcess.map((item) => item.id));
      state.inProcess = [
        ...state.inProcess,
        ...action.payload.filter((item) => !inProcessIds.has(item.id)),
      ];
    },
    setOnMeeting: (state, action) => {
      const onMeetingIds = new Set(state.onMeeting.map((item) => item.id));
      state.onMeeting = [
        ...state.onMeeting,
        ...action.payload.filter((item) => !onMeetingIds.has(item.id)),
      ];
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
  setNewApplicant,
  setInProcess,
  setOnMeeting,
} = orderReducer.actions;
export default orderReducer.reducer;
