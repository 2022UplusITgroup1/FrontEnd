// 비교하기 상세 > 상품 리스트 저장

import * as types from "../actions";

// items 에 비교하기 리스트 저장

const initialState = {
  items: [],
};

function compareDetailReducer(state = initialState, action) {
  //console.log(action);
  switch (action.type) {
    case types.SET_COMPARE_DETAIL_PRODUCTS: {
      return { items: action.data };
    }
    case types.ADD_COMPARE_DETAIL_PRODUCT: {
      return { items: [...state.items, action.data] };
    }
    case types.DELETE_COMPARE_DETAIL_PRODUCTS: {
      return {
        items: state.items.filter((item) => item.code !== action.code),
      };
    }
    default:
      return state;
  }
}

export default compareDetailReducer;
