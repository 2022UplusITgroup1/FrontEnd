import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import changeDetailReducer from "./changeDetailReducer";

const reducer = combineReducers({
  changeOptionReducer,
  //changeDetailReducer,
});

export default reducer;
