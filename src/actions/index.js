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
    planValue: data
  };
}

export function changeDiscount(data) {
  //console.log(data);
  return {
    type: CHANGE_DISCOUNT,
    discountValue: data
  };
}

export function changeBrand(data) {
    //console.log(data);
    return {
        type: CHANGE_BRAND,
        brandValue: data
    };
  }
  
export function changeStorage(data) {
    //console.log(data);
    return {
      type: CHANGE_STORAGE,
      storageValue: data
    };
  }

export function changeProductSort(data) {
    //console.log(data);
    return {
        type: CHANGE_PRODUCT_SORT,
        sortValue: data
    };
}

export function resetData() {
    return {
      type: RESET_DATA
    };
  }