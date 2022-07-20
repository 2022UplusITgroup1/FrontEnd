import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions } from "../../actions";

function ProductDetail({ product }) {
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // 기존 휴대폰, 요금제 가격 & 할인 및 할부 가격
  const [phonePrice, setPhonePrice] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);
  const [publicPrice, setPublicPrice] = useState(0);
  const [selectPrice, setSelectPrice] = useState(0);
  const [payPeriod, setPayPeriod] = useState(1);

  // 월별 할인이 적용된 휴대폰, 요금제 가격
  const [monthlyPhonePrice, setMonthlyPhonePrice] = useState(0);
  const [monthlyPlanPrice, setMonthlyPlanPrice] = useState(0);

  useEffect(() => {
    setPhonePrice(orderProduct.phone.price);
    setPlanPrice(orderProduct.plan.price);
    if (orderProduct.discountType === "1") {
      setPublicPrice(floorNumber(orderProduct.phone.price * 0.3));
    } else {
      setPublicPrice(0);
    }

    if (
      orderProduct.discountType === "2" ||
      orderProduct.discountType === "3"
    ) {
      setSelectPrice(floorNumber(orderProduct.plan.price * 0.25));
    } else {
      setSelectPrice(0);
    }
    setPayPeriod(orderProduct.payPeriod);
  }, [orderProduct]);

  useEffect(() => {
    setMonthlyPhonePrice(floorNumber((phonePrice - publicPrice) / payPeriod));
    setMonthlyPlanPrice(planPrice - selectPrice);
  }, [publicPrice, selectPrice, payPeriod]);

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 정보 및 요금 정보 */}
        <div className={styles.TitleInfo}>{orderProduct["phone"]["name"]}</div>
        <span className={styles.SubInfo}>
          {orderProduct["phone"]["color"]} | {orderProduct["phone"]["storage"]}
          GB | 신규가입
        </span>
        <div className={styles.PriceInfo}>
          {/* 상품 가격 정보 */}
          <div className={styles.CalcPriceInfo}>
            <strong>최종 결제금액 계산</strong>
          </div>
          {/* ul li */}
          <div className={styles.CalcMonthInfo}>
            {payPeriod === 1 ? (
              <ul className={styles.CalcMonthPhone}>
                <li className={styles.CalcMonthLITitle}>
                  기기 완납 결제 가격 {convertNumber(phonePrice - publicPrice)}{" "}
                  원
                </li>
                <li className={styles.CalcMonthLI}>
                  정상가 {convertNumber(phonePrice)} 원
                </li>
                {orderProduct.discountType === "1" && (
                  <li className={styles.CalcMonthLI}>
                    공시지원금 -{convertNumber(floorNumber(publicPrice))} 원
                  </li>
                )}
                <li className={styles.CalcMonthLI}>
                  실구매가 {convertNumber(phonePrice - publicPrice)} 원
                </li>
              </ul>
            ) : (
              <ul className={styles.CalcMonthPhone}>
                <li className={styles.CalcMonthLITitle}>
                  월 휴대폰 할부금{" "}
                  {convertNumber(
                    floorNumber((phonePrice - publicPrice) / payPeriod)
                  )}{" "}
                  원
                </li>
                <li className={styles.CalcMonthLI}>
                  정상가 {convertNumber(phonePrice)} 원
                </li>
                {orderProduct.discountType === "1" && (
                  <li className={styles.CalcMonthLI}>
                    공시지원금 -{convertNumber(floorNumber(publicPrice))} 원
                  </li>
                )}
                <li className={styles.CalcMonthLI}>
                  실구매가 {convertNumber(phonePrice - publicPrice)} 원
                </li>
                <li className={styles.CalcMonthLI}>
                  할부 개월수 {convertNumber(payPeriod)}개월
                </li>
              </ul>
            )}
            <ul className={styles.CalcMonthPlan}>
              <li className={styles.CalcMonthLITitle}>
                월 통신료 {convertNumber(planPrice - selectPrice)} 원
              </li>
              <li className={styles.CalcMonthLI}>
                요금제 {convertNumber(planPrice)} 원
              </li>
              {(orderProduct.discountType === "2" ||
                orderProduct.discountType === "3") && (
                <li className={styles.CalcMonthLISelect}>
                  선택 약정 할인 -{convertNumber(selectPrice)} 원
                </li>
              )}
              {/* discountType에 따라 다르게 계산 */}
            </ul>
            {payPeriod === 1 ? (
              <div className={styles.TotalPrice}>
                월 납부금액 {convertNumber(planPrice - selectPrice)} 원
              </div>
            ) : (
              <div className={styles.TotalPrice}>
                월 납부금액{" "}
                {convertNumber(monthlyPhonePrice + monthlyPlanPrice)} 원
              </div>
            )}
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
