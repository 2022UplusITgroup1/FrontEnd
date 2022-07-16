// 제조사 선택 시

function getBrandProduct(type, products) {
  if (type === "1") {
    // 삼성
    return "공시지원금";
  } else if (type === "2") {
    // 애플
    return "선택약정24개월";
  } else if (type === "3") {
    // 기타
    return "선택약정12개월";
  }
}

export default getBrandProduct;
