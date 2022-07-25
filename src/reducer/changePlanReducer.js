// 더 많은 요금제 보기 정렬 선택 시 변경

import * as types from "../actions";

const initialState = "0";

function changePlanReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_PLAN_SORT: {
      return action.planSortType;
    }
    default:
      return state;
  }
}

export default changePlanReducer;
