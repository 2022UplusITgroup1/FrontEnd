// 입력값 유효성 검사

function validateOrder(data) {
  // 휴대폰 번호 숫자만
  const regPhoneNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  // 이메일
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return (
    data.name.length > 0 &&
    regPhoneNumber.test(data.number) &&
    regEmail.test(data.email) &&
    data.address.length > 0
  );
}

export default validateOrder;
