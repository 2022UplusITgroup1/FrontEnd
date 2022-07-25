// 입력값 유효성 검사

// '-' 입력 시
//   let regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
// 숫자만 입력시
//   let regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

function validation(type, value) {
  // 휴대폰 번호 숫자만
  const regPhoneNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  // 이메일
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  switch (type) {
    case "phoneNumber":
      return regPhoneNumber.test(value);
    case "email":
      return regEmail.text(value);
    default:
      return false;
  }
}

export default validation;
