import { combineReducers } from "redux";

import addsubReducer from "./addsub";
import countingReducer from "./counting";

const reducer = combineReducers({
  value: addsubReducer,
  count: countingReducer,
});

export default reducer;
