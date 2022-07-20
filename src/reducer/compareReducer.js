// 비교하기 상품 리스트 저장

import * as types from "../actions";

// items 에 비교하기 리스트 저장

const initialState = {
  items: [],
};

function compareReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_COMPARE_PRODUCTS: {
      return { items: [...state.items, action.data] };
    }
    case types.RESET_DATA: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}

export default compareReducer;
