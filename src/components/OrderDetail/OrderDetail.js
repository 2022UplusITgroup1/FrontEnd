// 주문 페이지 내 주문 상품 정보 Box

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
        <div className={styles.MainImgContainer}>
          <img
            className={styles.MainImg}
            src={product.phone.imgThumbnail}
            alt={product.phone.code}
          />
        </div>
        <div className={styles.TitleInfo}>{product.phone.name}</div>
        <div className={styles.SubInfo}>
          {convertNumber(product.phone.storage)}GB | {product.phone.color}
        </div>
        <div className={styles.PlanInfo}>
          <ul className={styles.PlanInfoUL}>
            <li className={styles.PlanInfoLI}>신규가입</li>
            <li className={styles.PlanInfoLI}>{product.plan.name}</li>
            <li className={styles.PlanInfoLI}>
              {mapDiscountType(Number(product.discountType))}
            </li>
          </ul>
        </div>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.PriceInfoDL}>
            <div className={styles.PriceInfoDT}>휴대폰 가격</div>
            <div className={styles.PriceInfoDD}>0 원</div>
            <div className={styles.PriceInfoDT}>통신요금</div>
            <div className={styles.PriceInfoDD}>0 원</div>
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
