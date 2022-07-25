// 상세 페이지 > 상품 최종 결제금액 Box

import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";

// 결제 금액 초기화 값
const initialPrice = {
  discountName: "",
  phonePrice: 0,
  planPrice: 0,
  publicPrice: 0,
  selectPrice: 0,
  monthPhonePrice: 0,
  monthPlanPrice: 0,
  realPhonePrice: 0,
  total: 0,
};

function ProductDetail({ data }) {
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // 계산된 금액
  const [nowPrice, setNowPrice] = useState(initialPrice);

  const [payPeriod, setPayPeriod] = useState(1);

  // 요금제, 할인 유형, 할부기간이 변경될 때마다 새로 계산
  useEffect(() => {
    if (orderProduct.phone.price && orderProduct.plan.price) {
      const nowTotalPrice = calcPrices(
        data.phone.price,
        orderProduct.plan.price,
        orderProduct.discountType,
        orderProduct.payPeriod
      );
      setNowPrice(nowTotalPrice);
      setPayPeriod(orderProduct.payPeriod);
    }
  }, [orderProduct]);

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.TitleInfo}>{data.phone.name}</div>
        <span className={styles.SubInfo}>
          {orderProduct.phone.color} | {data.phone.storage.capability}
          GB | 신규가입
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            <strong>최종 결제금액 계산</strong>
          </div>
          <div className={styles.CalcMonthInfo}>
            {/* 할부 기간에 따라 다르게 계산 */}
            {payPeriod === 1 ? (
              <ul className={styles.CalcMonthPhone}>
                <li className={styles.CalcMonthLITitle}>
                  기기 완납 결제 가격 {convertNumber(nowPrice.realPhonePrice)}{" "}
                  원
                </li>
                <li className={styles.CalcMonthLI}>
                  정상가 {convertNumber(nowPrice.phonePrice)} 원
                </li>
                {orderProduct.discountType === "1" && (
                  <li className={styles.CalcMonthLI}>
                    공시지원금 -{convertNumber(nowPrice.publicPrice)} 원
                  </li>
                )}
                <li className={styles.CalcMonthLI}>
                  실구매가 {convertNumber(nowPrice.realPhonePrice)} 원
                </li>
              </ul>
            ) : (
              <ul className={styles.CalcMonthPhone}>
                <li className={styles.CalcMonthLITitle}>
                  월 휴대폰 할부금 {convertNumber(nowPrice.monthPhonePrice)} 원
                </li>
                <li className={styles.CalcMonthLI}>
                  정상가 {convertNumber(nowPrice.phonePrice)} 원
                </li>
                {orderProduct.discountType === "1" && (
                  <li className={styles.CalcMonthLI}>
                    공시지원금 -{convertNumber(nowPrice.publicPrice)} 원
                  </li>
                )}
                <li className={styles.CalcMonthLI}>
                  실구매가 {convertNumber(nowPrice.realPhonePrice)} 원
                </li>
                <li className={styles.CalcMonthLI}>
                  할부 개월수 {convertNumber(payPeriod)}개월
                </li>
              </ul>
            )}
            <ul className={styles.CalcMonthPlan}>
              <li className={styles.CalcMonthLITitle}>
                월 통신료 {convertNumber(nowPrice.monthPlanPrice)} 원
              </li>
              <li className={styles.CalcMonthLI}>
                요금제 {convertNumber(nowPrice.planPrice)} 원
              </li>
              {(orderProduct.discountType === "2" ||
                orderProduct.discountType === "3") && (
                <li className={styles.CalcMonthLISelect}>
                  선택 약정 할인 -{convertNumber(nowPrice.selectPrice)} 원
                </li>
              )}
            </ul>
            <div className={styles.TotalPrice}>
              월 납부금액 {convertNumber(nowPrice.total)} 원
            </div>
          </div>
        </div>
      </div>
      <div className={styles.InfoBtn}>
        {/* 온라인 주문 버튼 */}
        <Link to="/mobile/order">
          <button className={styles.OrderBtn}>온라인 주문</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
