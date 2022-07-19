import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import changeDetailReducer from "./changeDetailReducer";
import orderReducer from "./orderReducer";

const reducer = combineReducers({
  changeOptionReducer,
  //changeDetailReducer,
  orderReducer,
});

export default reducer;
