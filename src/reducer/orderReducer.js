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
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
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
