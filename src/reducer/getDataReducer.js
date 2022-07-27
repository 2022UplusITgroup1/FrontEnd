// 주문 조회 페이지에서 받은 값 저장 -> 주문 조회 결과 페이지에서 사용

import * as types from "../actions";

const initialState = {
  phone: {},
  plan: {},
};

function getDataReducer(state = initialState, action) {
  //console.log(action.data);

  switch (action.type) {
    case types.GET_DATA: {
      return {
        phone: action.data.phone,
        plan: action.data.plan,
      };
    }
    default:
      return state;
  }
}

export default getDataReducer;
