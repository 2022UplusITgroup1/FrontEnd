// 할부기간에 따른 가격 계산 함수

import floorNumber from "./floorNumber";
import mapDiscountType from "./mapDiscountType";

// 파라미터: 휴대폰 가격, 요금제 가격, 할인 유형, 할부 기간
function calcPrices(phone, plan, dcType, payPeriod) {
  // 공시지원금, 선택약정할인
  let publicPrice, selectPrice;
  if (dcType === "1") {
    publicPrice = floorNumber(phone * 0.3);
    selectPrice = 0;
  } else if (dcType === "2" || dcType === "3") {
    publicPrice = 0;
    selectPrice = floorNumber(plan * 0.25);
  }

  // 월별 휴대폰, 통신료
  let monthPhonePrice = floorNumber((phone - publicPrice) / payPeriod);
  let monthPlanPrice = plan - selectPrice;

  // 실구매가 = 휴대폰 정상가 - 공시지원금
  let realPhonePrice = phone - publicPrice;

  // 최종 월별 금액
  let total = 0;
  if (payPeriod === 1) {
    // 일시불 -> 기기 완납
    total = monthPlanPrice;
  } else {
    // 할부 적용가
    total = monthPhonePrice + monthPlanPrice;
  }

  return {
    discountName: mapDiscountType(dcType),
    phonePrice: phone,
    planPrice: plan,
    publicPrice: publicPrice,
    selectPrice: selectPrice,
    monthPhonePrice: monthPhonePrice,
    monthPlanPrice: monthPlanPrice,
    realPhonePrice: realPhonePrice,
    total: total,
  };
}

export default calcPrices;
