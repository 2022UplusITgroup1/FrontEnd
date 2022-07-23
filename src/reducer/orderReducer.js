// 상품 상세 페이지에서 최종 선택한 값으로 저장 -> 주문 페이지에서 사용

import * as types from "../actions";

const initialState = {
  phone: {
    code: "",
    name: "",
    imgThumbnail: "",
    storage: "",
    color: "",
    phoneCode: "",
    price: 0,
  },
  plan: {
    code: "",
    name: "",
    price: "",
  },
  discountType: 0,
  monthPrice: 0,
  payPeriod: 0,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_DETAIL: {
      return {
        ...action.data,
      };
    }
    case types.CHANGE_DETAIL_PLAN_TYPE: {
      return {
        phone: { ...state.phone },
        plan: action.plan,
        discountType: state.discountType,
        monthPrice: state.monthPrice,
        payPeriod: state.payPeriod,
      };
    }
    case types.RESET_DETAIL_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}

export default orderReducer;
