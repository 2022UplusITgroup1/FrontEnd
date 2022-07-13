import React from "react";
import styles from "./ProductDetail.module.css";

function ProductDetail({ property }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <h2>{property.title}</h2>
        <span className={styles.SubInfo}>
          {property.color} | {property.capacity} |{property.joinType}
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            <strong>최종 결제금액 계산</strong>
          </div>
          <div className={styles.CalcMonthInfo}>
            <strong>월 통신료</strong>
            <div className={styles.TotalPrice}>
              월 납부금액 {property.formattedPrice} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
