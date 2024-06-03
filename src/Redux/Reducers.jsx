// reducers/index.js
import { combineReducers } from "redux";
import yourReducer from "./yourReducer";

const rootReducer = combineReducers({
  yourReducer,
  // Add more reducers here if needed
});

export default rootReducer;
