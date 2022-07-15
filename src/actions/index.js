export const SELECT_PLAN = "SELECT_PLAN";
export const SELECT_DISCOUNT = "SELECT_DISCOUNT";
export const SELECT_PRODUCT = "SELECT_PRODUCT";

export function selectPlan() {
  return {
    type: SELECT_PLAN,
  };
}

export function selectDiscount() {
  return {
    type: SELECT_DISCOUNT,
  };
}

export function selectProduct() {
  return {
    type: SELECT_PRODUCT,
  };
}
