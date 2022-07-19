// 숫자 일의 자리에서 버림

function floorNumber(num) {
  return num - (num % 10);
}

export default floorNumber;
