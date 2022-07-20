import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import changeDetailReducer from "./changeDetailReducer";
import orderReducer from "./orderReducer";
import recentlyReducer from "./recentlyReducer";
import compareReducer from "./compareReducer";

const reducer = combineReducers({
  changeOptionReducer,
  //changeDetailReducer,
  orderReducer,
  recentlyReducer,
  compareReducer,
});

export default reducer;
