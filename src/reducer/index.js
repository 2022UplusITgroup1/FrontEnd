import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import orderReducer from "./orderReducer";
import recentlyReducer from "./recentlyReducer";
import compareReducer from "./compareReducer";

const reducer = combineReducers({
  changeOptionReducer,
  orderReducer,
  recentlyReducer,
  compareReducer,
});

export default reducer;
