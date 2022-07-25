// 연 5.9% 할부수수료 계산

import floorNumber from "./floorNumber";

function calcInstallmentFee(phone, rate) {
  rate = rate * 0.01;

  var r_money = eval((phone * rate) / 12);

  return floorNumber(r_money) * 12; //할부이자
}

export default calcInstallmentFee;
