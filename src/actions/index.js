export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_DISCOUNT = "CHANGE_DISCOUNT";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_STORAGE = "CHANGE_STORAGE";
export const CHANGE_PRODUCT_SORT = "CHANGE_PRODUCT_SORT";
export const RESET_DATA = "RESET_DATA";

export function changePlan(data) {
  console.log("changePlan: " + data);
  return {
    type: CHANGE_PLAN,
    planValue: data,
  };
}

export function changeDiscount(data) {
  console.log("changeDiscount: " + data);
  return {
    type: CHANGE_DISCOUNT,
    discountValue: data,
  };
}

export function changeBrand(data) {
  console.log("changeBrand: " + data);
  return {
    type: CHANGE_BRAND,
    brandValue: data,
  };
}

export function changeStorage(data) {
  console.log("changeStorage: " + data);
  return {
    type: CHANGE_STORAGE,
    storageValue: data,
  };
}

export function changeProductSort(data) {
  console.log("changeProductSort: " + data);
  return {
    type: CHANGE_PRODUCT_SORT,
    sortValue: data,
  };
}

export function resetData() {
  return {
    type: RESET_DATA,
  };
}

export const SELECT_PHONE_COLOR = "SELECT_PHONE_COLOR";
export const SELECT_PLAN_CODE = "SELECT_PLAN_CODE";
export const SELECT_PLAN_NAME = "SELECT_PLAN_NAME";
export const SELECT_PLAN_PRICE = "SELECT_PLAN_PRICE";
export const SELECT_MONTHPRICE = "SELECT_MONTHPRICE";
export const SELECT_DETAIL = "SELECT_DETAIL";

export function selectPhoneColor(data) {
  console.log("selectPhoneColor: " + data);
  return {
    type: SELECT_PHONE_COLOR,
    color: data,
  };
}

export function selectPlanCode(data) {
  console.log("selectPlanCode: " + data);
  return {
    type: SELECT_PLAN_CODE,
    code: data,
  };
}

export function selectPlanName(data) {
  console.log("selectPlanName: " + data);
  return {
    type: SELECT_PLAN_NAME,
    code: data,
  };
}

export function selectPlanPrice(data) {
  console.log("selectPlanPrice: " + data);
  return {
    type: SELECT_PLAN_PRICE,
    code: data,
  };
}

export function selectMonthprice(data) {
  console.log("selectMonthprice: " + data);
  return {
    type: SELECT_MONTHPRICE,
    code: data,
  };
}

export function selectDetail(data) {
  console.log("selectDetail: " + data.phone.code);
  return {
    type: SELECT_DETAIL,
    data: {
      phone: {
        code: data.phone.code,
        name: data.phone.name,
        imgThumbnail: data.phone.imgThumbnail,
        storage: data.phone.storage,
        color: data.phone.color,
        price: data.phone.price,
      },
      plan: {
        code: data.plan.code,
        name: data.plan.name,
        price: data.plan.price,
      },
      discountType: data.discountType,
      monthPrice: data.monthPrice,
    },
  };
}
