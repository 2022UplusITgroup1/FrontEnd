// 비교하기 상품 리스트 저장

import * as types from "../actions";

// items 에 비교하기 리스트 저장

const initialState = {
  items: [],
  isOpen: false,
};

function compareReducer(state = initialState, action) {
  //console.log(action);
  switch (action.type) {
    case types.SET_COMPARE_PRODUCTS: {
      return { items: [...state.items, action.data], isOpen: state.isOpen };
    }
    case types.SET_COMPARE_OPEN: {
      return { items: state.items, isOpen: action.data.isOpen };
    }
    case types.DELETE_COMPARE_PRODUCTS: {
      return {
        items: state.items.filter((item) => item.code !== action.code),
        isOpen: state.isOpen,
      };
    }
    default:
      return state;
  }
}

export default compareReducer;
