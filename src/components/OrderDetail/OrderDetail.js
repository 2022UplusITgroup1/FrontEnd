import React from "react";
import styles from "./OrderDetail.module.css";
import convertNumber from "../../utils/convertNumber";
import mapDiscountType from "../../utils/mapDiscountType";

function OrderDetail({ product }) {
  //console.log(product);
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.MainImg}>
          <img
            className={styles.MainImg}
            src={product.phone.imgThumbnail}
            alt={product.phone.code}
          />
        </div>
        <div className={styles.TitleInfo}>{product.phone.name}</div>
        <span className={styles.SubInfo}>
          {convertNumber(product.phone.storage)}GB | {product.phone.color}
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            {product.plan.name} |{" "}
            {mapDiscountType(Number(product.discountType))}
          </div>
          <div className={styles.CalcMonthInfo}>
            <div className={styles.TotalPrice}>
              월 납부금액 {convertNumber(product.monthPrice)} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
