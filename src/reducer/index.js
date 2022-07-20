import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import changeDetailReducer from "./changeDetailReducer";
import orderReducer from "./orderReducer";
import recentlyReducer from "./recentlyReducer";

const reducer = combineReducers({
  changeOptionReducer,
  //changeDetailReducer,
  orderReducer,
  recentlyReducer,
});

export default reducer;
