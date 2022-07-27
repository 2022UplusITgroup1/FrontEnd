// 주문 번호

import * as types from "../actions";

const initialState = 0;

function orderNumberReducer(state = initialState, action) {
  //console.log(action.data);

  switch (action.type) {
    case types.SET_ORDER_NUMBER: {
      return action.data;
    }
    default:
      return state;
  }
}

export default orderNumberReducer;
