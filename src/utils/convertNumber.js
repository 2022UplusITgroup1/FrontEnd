// 숫자 천 단위마다 ',' 추가

function convertNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default convertNumber;
