// 제조사 type 과 이름 mapping

function mapBrandName(type) {
  if (type === "1") {
    return "삼성";
  } else if (type === "2") {
    return "애플";
  } else if (type === "3") {
    return "기타";
  }
}

export default mapBrandName;
