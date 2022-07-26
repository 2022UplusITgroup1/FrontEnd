// 입력값 유효성 검사

function validateOrderInquiry(data) {
  // 휴대폰 번호 숫자만
  const regPhoneNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

  return (
    data.name.length > 0 &&
    regPhoneNumber.test(data.phoneNumber) &&
    data.orderNumber.length > 0
  );
}

export default validateOrderInquiry;
