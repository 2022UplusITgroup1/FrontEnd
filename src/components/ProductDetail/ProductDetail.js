import React from "react";
import styles from "./ProductDetail.module.css";
import { Link } from "react-router-dom";

function ProductDetail({ property }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.TitleInfo}>{property["phone"]["name"]}</div>
        <span className={styles.SubInfo}>
          {property["phone"]["color"]} |{" "}
          {property["phone"]["storage"]["capability"]}GB |{" "}
          {property["joinType"]}
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            <strong>최종 결제금액 계산</strong>
          </div>
          <div className={styles.CalcMonthInfo}>
            <strong>월 휴대폰 할부금</strong>
            <span>0 원</span>
            <span>정상가</span>
            <strong>월 통신료</strong>
            <span>0 원</span>
            <div className={styles.TotalPrice}>
              월 납부금액 {property["totalPrice"]} 원
            </div>
          </div>
        </div>
      </div>
      <div className={styles.InfoBtn}>
        {/* 온라인 주문 버튼 */}
        <Link to="/order">
          <button className={styles.OrderBtn}>온라인 주문</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
