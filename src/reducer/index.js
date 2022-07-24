import { combineReducers } from "redux";

import changeOptionReducer from "./changeOptionReducer";
import changePlanReducer from "./changePlanReducer";
import orderReducer from "./orderReducer";
import recentlyReducer from "./recentlyReducer";
import compareReducer from "./compareReducer";
import compareDetailReducer from "./compareDetailReducer";

const reducer = combineReducers({
  changeOptionReducer,
  changePlanReducer,
  orderReducer,
  recentlyReducer,
  compareReducer,
  compareDetailReducer,
});

export default reducer;
