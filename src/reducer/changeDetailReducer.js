import * as types from "../actions";

const initialState = {
  planValue: "0",
  discountValue: "0",
  sortValue: "0",
};

function changeDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_PLAN: {
      return {
        ...state,
        planValue: action.planValue,
      };
    }
    case types.CHANGE_DISCOUNT: {
      return {
        ...state,
        discountValue: action.discountValue,
      };
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

export default changeDetailReducer;
