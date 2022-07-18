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
  monthPrice: 0,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_PHONE_COLOR: {
      return {
        ...state,
        phone: { ...state.phone, color: action.color },
      };
    }
    case types.SELECT_PLAN_CODE: {
      return {
        ...state,
        plan: { ...state.plan, code: action.code },
      };
    }
    case types.SELECT_PLAN_NAME: {
      return {
        ...state,
        plan: { ...state.plan, code: action.name },
      };
    }
    case types.SELECT_PLAN_PRICE: {
      return {
        ...state,
        plan: { ...state.plan, code: action.price },
      };
    }
    case types.SELECT_MONTHPRICE: {
      return {
        ...state,
        monthPrice: action.monthPrice,
      };
    }
    case types.SELECT_DETAIL: {
      return {
        ...action.data,
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

export default orderReducer;
