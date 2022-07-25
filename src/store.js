import { createStore } from "redux";
import reducer from "./reducer";

// 크롬 Redux 개발자 도구 옵션 추가
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
