// 할인유형 type 과 이름 mapping

function mapDiscountType(type) {
  if (type === 1) {
    return "공시지원금";
  } else if (type === 2) {
    return "선택약정24개월";
  } else if (type === 3) {
    return "선택약정12개월";
  }
}

export default mapDiscountType;
