// 주문 조회 페이지에서 받은 값 저장 -> 주문 조회 결과 페이지에서 사용

import * as types from "../actions";

const initialState = {
  name: "",
  phoneNumber: "",
  orderNumber: "",
};

function orderInquiryReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ORDER_INQUIRY_INFO: {
      return {
        ...action.data,
      };
    }
    case types.RESET_ORDER_INQUIRY_INFO: {
      return initialState;
    }
    default:
      return state;
  }
}

export default orderInquiryReducer;
