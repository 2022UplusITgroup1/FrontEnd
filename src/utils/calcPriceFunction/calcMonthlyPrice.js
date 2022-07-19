// 기종 & 요금제에 따른 월별 요금 계산 (정상가, 공시지원금, 선택약정 모든 경우)

function CalcMonthlyPrice(phone, plan, discountType, payPeriod) {
  let phonePrice = phone;
  let planPrice = plan;
  let originalPhonePrice = phone;
  let realPhonePrice = phone / payPeriod - ((phone / payPeriod) % 10);
  let monthlyPrice = 0;
  if (discountType === "1") {
    // 공시지원금
    realPhonePrice =
      originalPhonePrice / payPeriod - ((originalPhonePrice / payPeriod) % 10);
  } else if (discountType === "2") {
    // 선택 약정 24개월
    monthlyPrice += plan * 2 * 0.25 - ((plan / 24) % 10);
  } else {
    // 선택 약정 12개월
    monthlyPrice += plan / 12 - ((plan / 12) % 10);
  }

  if (payPeriod === 0) {
  }

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
