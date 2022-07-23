// Redux Action Types & Functions

/* ---------- 상품 리스트 페이지 옵션 선택 ---------- */

export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_DISCOUNT = "CHANGE_DISCOUNT";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_STORAGE = "CHANGE_STORAGE";
export const CHANGE_PRODUCT_SORT = "CHANGE_PRODUCT_SORT";
export const CHANGE_OPTIONS = "CHANGE_OPTIONS";

// 요금제 옵션
export function changePlan(data) {
  console.log("changePlan: " + data);
  return {
    type: CHANGE_PLAN,
    planType: data,
  };
}

// 할인 유형 옵션
export function changeDiscount(data) {
  console.log("changeDiscount: " + data);
  return {
    type: CHANGE_DISCOUNT,
    discountType: data,
  };
}

// 제조사 옵션
export function changeBrand(data) {
  console.log("changeBrand: " + data);
  return {
    type: CHANGE_BRAND,
    brandType: data,
  };
}

// 저장용량 옵션
export function changeStorage(data) {
  console.log("changeStorage: " + data);
  return {
    type: CHANGE_STORAGE,
    storageType: data,
  };
}

// 상품 정렬 옵션
export function changeProductSort(data) {
  console.log("changeProductSort: " + data);
  return {
    type: CHANGE_PRODUCT_SORT,
    sortType: data,
  };
}

// 옵션 전체
export function changeOptions(data) {
  console.log("changeOptions: " + data);
  return {
    type: CHANGE_OPTIONS,
    data: {
      planType: data.planType,
      discountType: data.discountType,
      brandType: data.brandType,
      storageType: data.storageType,
      sortType: data.sortType,
    },
  };
}

/* ---------- 더 많은 요금제 보기 > 요금제 정렬 ---------- */

export const CHANGE_PLAN_SORT = "CHANGE_PLAN_SORT";

// 요금제 정렬 옵션
export function changePlanSort(data) {
  console.log("changePlanSort: " + data);
  return {
    type: CHANGE_PLAN_SORT,
    planSortType: data,
  };
}

/* ---------- 상세 페이지 -> 주문 페이지 ---------- */

export const SELECT_DETAIL = "SELECT_DETAIL";
export const CHANGE_DETAIL_PLAN_TYPE = "CHANGE_DETAIL_PLAN_TYPE";

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

// 다른 요금제 선택 모달창에서 선택한 값
export function changeDetailPlanType(data) {
  console.log("changeDetailPlanType: " + data);
  return {
    type: CHANGE_DETAIL_PLAN_TYPE,
    plan: {
      code: data.code,
      name: data.name,
      price: data.price,
    },
  };
}

/* ---------- 상세 페이지 -> 최근 본 상품 ---------- */

export const SET_RECENTLY_PRODUCT = "SET_RECENTLY_PRODUCT";
export const RESET_DETAIL_DATA = "RESET_DETAIL_DATA";

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

export function resetDetailData() {
  return {
    type: RESET_DETAIL_DATA,
  };
}

/* ---------- 비교하기 ---------- */

export const SET_COMPARE_PRODUCTS = "SET_COMPARE_PRODUCTS";
export const SET_COMPARE_OPEN = "SET_COMPARE_OPEN";
export const DELETE_COMPARE_PRODUCTS = "DELETE_COMPARE_PRODUCTS";

// 비교하기 상품들 저장
export function setCompareProduct(data) {
  console.log("setCompareProduct: " + data);
  return {
    type: SET_COMPARE_PRODUCTS,
    data: {
      code: data.code,
      name: data.name,
      color: data.color,
      imgThumbnail: data.imgThumbnail,
      plan: data.plan,
      networkSupport: data.networkSupport,
      discountType: data.discountType,
      totalPrice: data.totalPrice,
      isCompare: true,
    },
  };
}

// 비교하기 모달창 open
export function setCompareModalIsOpen(data) {
  return {
    type: SET_COMPARE_OPEN,
    data: {
      isOpen: data,
      //onOpen: data.onOpen,
      //onClose: data.onClose,
    },
  };
}

// 비교하기 상품 삭제하기
export function deleteCompareProduct(code) {
  return {
    type: DELETE_COMPARE_PRODUCTS,
    code,
  };
}

/* ---------- 초기화 ---------- */

export const RESET_DATA = "RESET_DATA";

// 전체 데이터 초기화
export function resetData() {
  return {
    type: RESET_DATA,
  };
}
