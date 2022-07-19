// 기종 & 요금제에 따른 월별 요금 계산 (정상가, 공시지원금, 선택약정 모든 경우)

import floorNumber from "./floorNumber";

function calcMonthPrice(phone, plan) {
  // 정상가
  let phonePrice = floorNumber(phone / 12);
  let planPrice = plan;

  // 공시지원금 적용가
  let publicPhonePrice = floorNumber((phone * 0.7) / 12);

  // 선택 약정 적용가
  let selectPhonePrice = floorNumber(plan * 0.75);

  return {
    // 정상가
    original: {
      name: "정상가",
      phone: phonePrice,
      plan: planPrice,
      total: phonePrice + planPrice,
    },
    // 공시지원금
    public: {
      name: "공시지원금",
      phone: publicPhonePrice,
      plan: planPrice,
      total: publicPhonePrice + planPrice,
    },
    // 선택약정24개월
    select24: {
      name: "선택약정24개월",
      phone: phonePrice,
      plan: selectPhonePrice,
      total: phonePrice + selectPhonePrice,
    },
    // 선택약정12개월
    select12: {
      name: "선택약정12개월",
      phone: phonePrice,
      plan: selectPhonePrice,
      total: phonePrice + selectPhonePrice,
    },
  };
}

export default calcMonthPrice;
