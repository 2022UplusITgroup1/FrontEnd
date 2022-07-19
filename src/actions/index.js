export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_DISCOUNT = "CHANGE_DISCOUNT";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_STORAGE = "CHANGE_STORAGE";
export const CHANGE_PRODUCT_SORT = "CHANGE_PRODUCT_SORT";
export const CHANGE_OPTIONS = "CHANGE_OPTIONS";
export const SELECT_DETAIL = "SELECT_DETAIL";
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

export function changeOptions(data) {
  console.log("changeOptions: " + data);
  return {
    type: CHANGE_OPTIONS,
    data: {
      planValue: data.planValue,
      discountValue: data.discountValue,
      brandValue: data.brandValue,
      storageValue: data.storageValue,
      sortValue: data.sortValue,
    },
  };
}

export function resetData() {
  return {
    type: RESET_DATA,
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
      payPeriod: data.payPeriod,
    },
  };
}
