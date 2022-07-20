// Redux Actions

export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_DISCOUNT = "CHANGE_DISCOUNT";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_STORAGE = "CHANGE_STORAGE";
export const CHANGE_PRODUCT_SORT = "CHANGE_PRODUCT_SORT";
export const CHANGE_OPTIONS = "CHANGE_OPTIONS";
export const SELECT_DETAIL = "SELECT_DETAIL";
export const SET_RECENTLY_PRODUCT = "SET_RECENTLY_PRODUCT";
export const RESET_DATA = "RESET_DATA";

// 조건 선택
// 요금제 옵션
export function changePlan(data) {
  console.log("changePlan: " + data);
  return {
    type: CHANGE_PLAN,
    planValue: data,
  };
}

// 할인 유형 옵션
export function changeDiscount(data) {
  console.log("changeDiscount: " + data);
  return {
    type: CHANGE_DISCOUNT,
    discountValue: data,
  };
}

// 제조사 옵션
export function changeBrand(data) {
  console.log("changeBrand: " + data);
  return {
    type: CHANGE_BRAND,
    brandValue: data,
  };
}

// 저장용량 옵션
export function changeStorage(data) {
  console.log("changeStorage: " + data);
  return {
    type: CHANGE_STORAGE,
    storageValue: data,
  };
}

// 정렬 옵션
export function changeProductSort(data) {
  console.log("changeProductSort: " + data);
  return {
    type: CHANGE_PRODUCT_SORT,
    sortValue: data,
  };
}

// 옵션 전체
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

// 상세 페이지에서 선택한 값
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

// 최근 본 상품 정보
export function setRecentlyProduct(data) {
  console.log("setRecentlyProduct: " + data);
  return {
    type: SET_RECENTLY_PRODUCT,
    data: {
      phoneCode: data.phoneCode,
      phoneName: data.phoneName,
      phoneColor: data.phoneColor,
      imgThumbnail: data.imgThumbnail,
      planCode: data.planCode,
      networkSupport: data.networkSupport,
      discountType: data.discountType,
      monthPrice: data.monthPrice,
    },
  };
}

// 전체 데이터 초기화
export function resetData() {
  return {
    type: RESET_DATA,
  };
}
