// 제조사 type 과 이름 mapping

function mapStorageType(type) {
  if (type === "1") {
    return "64GB";
  } else if (type === "2") {
    return "128GB";
  } else if (type === "3") {
    return "256GB";
  } else if (type === "3") {
    return "512GB 이상";
  }
}

export default mapStorageType;
