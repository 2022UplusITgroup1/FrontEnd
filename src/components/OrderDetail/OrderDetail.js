// 주문 페이지 내 주문 상품 정보 Box

import React from "react";
import styles from "./OrderDetail.module.css";
import convertNumber from "../../utils/convertNumber";
import mapDiscountType from "../../utils/mapDiscountType";
import calcPrices from "../../utils/calcPrices";

const IMAGE_URI = `${process.env.REACT_APP_IMAGE_URI}`;

function OrderDetail({ product }) {
  //console.log(product);
  let nowPrice = calcPrices(
    product.phone.price,
    product.plan.price,
    product.discountType,
    product.payPeriod
  );
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.MainImgContainer}>
          <img
            className={styles.MainImg}
            src={`${IMAGE_URI}${product.phone.imgThumbnail}`}
            alt={product.phone.code}
          />
        </div>
        <div className={styles.TitleInfo}>{product.phone.name}</div>
        <div className={styles.SubInfo}>
          {convertNumber(product.phone.storage.capability)}GB |{" "}
          {product.phone.color}
        </div>
        <div className={styles.PlanInfo}>
          <ul className={styles.PlanInfoUL}>
            <li className={styles.PlanInfoLI}>신규가입</li>
            <li className={styles.PlanInfoLI}>{product.plan.name}</li>
            <li className={styles.PlanInfoLI}>
              {mapDiscountType(product.discountType)}
            </li>
          </ul>
        </div>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.PriceInfoDL}>
            {product.payPeriod === 1 ? (
              <>
                <div className={styles.PriceInfoDT}>기기 완납 결제 가격</div>
                <div className={styles.PriceInfoDD}>
                  {convertNumber(nowPrice.monthPhonePrice)} 원
                </div>
              </>
            ) : (
              <>
                <div className={styles.PriceInfoDT}>휴대폰 가격</div>
                <div className={styles.PriceInfoDD}>
                  월 {convertNumber(nowPrice.monthPhonePrice)} 원
                </div>
              </>
            )}
            <div className={styles.PriceInfoDT}>통신요금</div>
            <div className={styles.PriceInfoDD}>
              월 {convertNumber(nowPrice.monthPlanPrice)} 원
            </div>
          </div>
          <div className={styles.CalcMonthInfo}>
            <div className={styles.TotalPrice}>
              월 납부금액 {convertNumber(nowPrice.total)} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
