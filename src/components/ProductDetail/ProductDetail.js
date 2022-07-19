import React from "react";
import styles from "./ProductDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";

function ProductDetail({ product }) {
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.TitleInfo}>{product["phone"]["name"]}</div>
        <span className={styles.SubInfo}>
          {product["phone"]["color"]} |{" "}
          {product["phone"]["storage"]["capability"]}GB | 신규가입
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            <strong>최종 결제금액 계산</strong>
          </div>
          {/* ul li */}
          <div className={styles.CalcMonthInfo}>
            <ul className={styles.CalcMonthPhone}>
              <li className={styles.CalcMonthLITitle}>
                월 휴대폰 할부금{" "}
                {convertNumber(
                  Math.ceil(orderProduct.phone.price / orderProduct.payPeriod)
                )}{" "}
                원
              </li>
              <li className={styles.CalcMonthLI}>
                정상가 {convertNumber(orderProduct.phone.price)} 원
              </li>
              <li className={styles.CalcMonthLI}>
                실구매가 {convertNumber(orderProduct.phone.price)} 원
              </li>
              <li className={styles.CalcMonthLI}>
                할부 개월수 {convertNumber(orderProduct.payPeriod)}개월
              </li>
              <li className={styles.CalcMonthLI}>
                할부수수료(연 5.9%){" "}
                {convertNumber(
                  Math.ceil((orderProduct.phone.price / 12) * 0.059)
                )}{" "}
                원
              </li>
            </ul>
            <ul className={styles.CalcMonthPlan}>
              <li className={styles.CalcMonthLITitle}>
                월 통신료{" "}
                {convertNumber(Math.ceil(orderProduct.plan.price / 12))} 원
              </li>
              <li className={styles.CalcMonthLI}>
                요금제 {convertNumber(Math.ceil(orderProduct.plan.price / 12))}{" "}
                원
              </li>
              <li className={styles.CalcMonthLISelect}>선택 약정 할인 -0 원</li>
              {/* discountType에 따라 다르게 계산 */}
            </ul>
            <div className={styles.TotalPrice}>
              월 납부금액 {convertNumber(orderProduct.monthPrice)} 원
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
