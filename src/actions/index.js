// Redux Action Types & Functions

/* ---------- 데이터 저장 ---------- */

export const GET_DATA = "GET_DATA";

// 상품 정보
export function getData(data) {
  console.log("getData: " + data);
  return {
    type: GET_DATA,
    data,
  };
}

/* ---------- 상품 리스트 페이지 옵션 선택 ---------- */

export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_DISCOUNT = "CHANGE_DISCOUNT";
export const CHANGE_BRAND = "CHANGE_BRAND";
export const CHANGE_STORAGE = "CHANGE_STORAGE";
export const CHANGE_PRODUCT_SORT = "CHANGE_PRODUCT_SORT";
export const CHANGE_OPTIONS = "CHANGE_OPTIONS";
export const RESET_OPTION_DATA = "RESET_OPTION_DATA";

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

// 전체 데이터 초기화
export function resetOptionData() {
  return {
    type: RESET_OPTION_DATA,
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
export const RESET_DETAIL_DATA = "RESET_DETAIL_DATA";

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
        storage: { capability: data.phone.storage },
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

// 상세 페이지에서 선택한 값 초기화
export function resetDetailData() {
  return {
    type: RESET_DETAIL_DATA,
  };
}

/* ---------- 상세 페이지 -> 최근 본 상품 ---------- */

export const SET_RECENTLY_PRODUCT = "SET_RECENTLY_PRODUCT";

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
/*주문 결제하기*/
export const SET_ORDER_DETAIL_INFO = "SET_ORDER_INQUIRY_INFO";

export function setOrderDetailInfo(data) {
  console.log("setOrderDetailInfo: " + data);
  return {
    type: SET_ORDER_DETAIL_INFO,
    data,
    // data: {
    //   name: data.name
    //   // // phoneNumber: data.phoneNumber,
    //   // orderNumber: data.orderNumber,
    //   // // phoneName: data.phoneName,
    //   // // phoneColor: data.color,
    //   // // planName: data.planName,
    //   // monthPrice: data.monthPrice,
    //   // payPeriod: data.payPeriod

    // },
  };
}




/* ---------- 주문 조회 -> 주문 조회 결과 ---------- */

export const SET_ORDER_INQUIRY_INFO = "SET_ORDER_INQUIRY_INFO";
export const RESET_ORDER_INQUIRY_INFO = "RESET_ORDER_INQUIRY_INFO";

// 주문 조회 정보
export function setOrderInquiryInfo(data) {
  console.log("setOrderInquiryInfo: " + data);
  return {
    type: SET_ORDER_INQUIRY_INFO,
    data,
    // data: {
    //   name: data.name
    //   // // phoneNumber: data.phoneNumber,
    //   // orderNumber: data.orderNumber,
    //   // // phoneName: data.phoneName,
    //   // // phoneColor: data.color,
    //   // // planName: data.planName,
    //   // monthPrice: data.monthPrice,
    //   // payPeriod: data.payPeriod

    // },
  };
}

// 주문 조회 정보 초기화
export function resetOrderInquiryInfo() {
  return {
    type: RESET_ORDER_INQUIRY_INFO,
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

/* ---------- 비교하기 상세 ---------- */

export const SET_COMPARE_DETAIL_PRODUCTS = "SET_COMPARE_DETAIL_PRODUCTS";
export const ADD_COMPARE_DETAIL_PRODUCT = "ADD_COMPARE_DETAIL_PRODUCT";
export const DELETE_COMPARE_DETAIL_PRODUCTS = "DELETE_COMPARE_DETAIL_PRODUCTS";
export const RESET_COMPARE_DETAIL_DATA = "RESET_COMPARE_DETAIL_DATA";

// 비교하기 상세 모달 > 초기값 처리
export function setCompareDetailProducts(data) {
  console.log("setCompareDetailProducts: " + data);
  return {
    type: SET_COMPARE_DETAIL_PRODUCTS,
    data,
  };
}

// 비교하기 상세 모달 > 추가 이벤트 처리
export function addCompareDetailProduct(data) {
  console.log("addCompareDetailProduct: " + data);
  return {
    type: ADD_COMPARE_DETAIL_PRODUCT,
    data: {
      code: data.code,
      name: data.name,
      color: data.color,
      imgThumbnail: data.imgThumbnail,
      plan: data.plan,
      networkSupport: data.networkSupport,
      discountType: data.discountType,
      totalPrice: data.totalPrice,
    },
  };
}

// 비교하기 상세 상품 삭제하기
export function deleteCompareDetailProducts(code, plan, discountType) {
  return {
    type: DELETE_COMPARE_DETAIL_PRODUCTS,
    code,
    plan,
    discountType,
  };
}

// 상세 모달창에서 선택한 값 초기화
export function resetCompareDetailData() {
  return {
    type: RESET_COMPARE_DETAIL_DATA,
  };
}
