// 기종 & 요금제에 따른 월별 요금 계산 (정상가, 공시지원금, 선택약정 모든 경우)

import floorNumber from "../floorNumber";

function CalcMonthlyPrice(phone, plan, discountType, payPeriod) {
  // 정상가
  let phonePrice = floorNumber(phone / 12);
  let planPrice = floorNumber(plan / 12);

  // 공시지원금 적용가
  let phonePrice1 = floorNumber((phone * 0.3) / 12);

  // 선택 약정 24개월 적용가
  let planPrice24 = floorNumber((plan * 24 * 0.25) / 12);

  // 선택 약정 12개월 적용가
  let planPrice12 = floorNumber((plan * 12 * 0.25) / 12);

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
      phone: phonePrice1,
      plan: planPrice,
      total: phonePrice1 + planPrice,
    },
    // 선택약정24개월
    select24: {
      name: "선택약정24개월",
      phone: phonePrice,
      plan: planPrice24,
      total: phonePrice + planPrice24,
    },
    // 선택약정12개월
    select12: {
      name: "선택약정12개월",
      phone: phonePrice,
      plan: planPrice12,
      total: phonePrice + planPrice12,
    },
  };
}

export default CalcMonthlyPrice;
