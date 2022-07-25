// 연 5.9% 할부수수료 계산

import floorNumber from "./floorNumber";

function calcInstallmentFee(phone, rate) {
  rate = rate * 0.01;

  let r_money = floorNumber(floorNumber(phone * rate) / 12);

  return r_money; //할부이자
}

export default calcInstallmentFee;
