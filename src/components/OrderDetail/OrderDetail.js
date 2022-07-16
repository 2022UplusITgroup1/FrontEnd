import React from "react";
import styles from "./OrderDetail.module.css";
import convertPrice from "../../utils/convertPrice";

function OrderDetail({ property }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.MainImg}>
          <img
            className={styles.MainImg}
            src={property.imageUrl}
            alt="PRODUCT"
          />
        </div>
        <div className={styles.TitleInfo}>{property.title}</div>
        <span className={styles.SubInfo}>
          {property.capacity}GB | {property.color}
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>{property.subTitle}</div>
          <div className={styles.CalcMonthInfo}>
            <div className={styles.TotalPrice}>
              월 납부금액 {convertPrice(property.formattedPrice)} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
