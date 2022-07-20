// 상품 리스트 페이지 조건 선택 시 변경

import * as types from "../actions";

const initialState = {
  planType: "0",
  discountType: "0",
  brandType: "0",
  storageType: "0",
  sortType: "0",
};

function changeOptionReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_PLAN: {
      return {
        ...state,
        planType: action.planType,
      };
    }
    case types.CHANGE_DISCOUNT: {
      return {
        ...state,
        discountType: action.discountType,
      };
    }
    case types.CHANGE_BRAND: {
      return {
        ...state,
        brandType: action.brandType,
      };
    }
    case types.CHANGE_STORAGE: {
      return {
        ...state,
        storageType: action.storageType,
      };
    }
    case types.CHANGE_PRODUCT_SORT: {
      return {
        ...state,
        sortType: action.sortType,
      };
    }
    case types.CHANGE_OPTIONS: {
      return action.data;
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

export default changeOptionReducer;
