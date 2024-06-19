import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import orderReducer from "./orderReducer";

export default configureStore({
  reducer: {
    general: generalSlice,
    orderReducer: orderReducer,
  },
});
