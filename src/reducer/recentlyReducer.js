// 최근 본 상품 리스트 저장

import * as types from "../actions";

// items 에 최근 본 상품 리스트 저장

const initialState = {
  items: [],
};

function recentlyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_RECENTLY_PRODUCT: {
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

export default recentlyReducer;
