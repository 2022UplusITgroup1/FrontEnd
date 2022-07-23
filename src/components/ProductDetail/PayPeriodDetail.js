// 상세 페이지 > 할부기간

import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectDetail } from "../../actions";
import calcPrices from "../../utils/calcPrices";

function PayPeriodDetail({ data, plan }) {
  const dispatch = useDispatch();

  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // 할인 유형
  const [payPeriod, setPayPeriod] = useState(orderProduct.payPeriod);
  const onChangePayPeriod = (value) => {
    setPayPeriod(value);
  };

  // Redux Dispatch -> 주문 정보 저장
  const onSelectDetail = (nowPlan, nowTotalPrice) => {
    const value = {
      phone: {
        code: data.phone.code,
        name: data.phone.name,
        imgThumbnail: data.phone.imgThumbnail,
        storage: data.phone.storage.capability,
        color: orderProduct.phone.color,
        price: data.phone.price,
      },
      plan: {
        code: nowPlan.code,
        name: nowPlan.name,
        price: nowPlan.price,
      },
      discountType: orderProduct.discountType,
      monthPrice: nowTotalPrice.total,
      payPeriod: payPeriod,
    };
    dispatch(selectDetail(value));
  };

  // 할부기간 변경할 때마다 redux 에 update
  useEffect(() => {
    const nowTotalPrice = calcPrices(
      data.phone.price,
      plan.price,
      orderProduct.discountType,
      payPeriod
    );
    onSelectDetail(plan, nowTotalPrice);
  }, [payPeriod]);

  return (
    <>
      <div className={styles.PayPeriodContainer}>
        <button
          className={styles.PayPeriod}
          onClick={(e) => onChangePayPeriod(1)}
          style={{
            borderColor: payPeriod === 1 ? "#000" : "#ddd",
            color: payPeriod === 1 ? "#000" : "#666",
          }}
        >
          카드/간편결제
          <div>(일시불/할부)</div>
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => onChangePayPeriod(12)}
          style={{
            borderColor: payPeriod === 12 ? "#000" : "#ddd",
            color: payPeriod === 12 ? "#000" : "#666",
          }}
        >
          12개월
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => onChangePayPeriod(24)}
          style={{
            borderColor: payPeriod === 24 ? "#000" : "#ddd",
            color: payPeriod === 24 ? "#000" : "#666",
          }}
        >
          24개월
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => onChangePayPeriod(36)}
          style={{
            borderColor: payPeriod === 36 ? "#000" : "#ddd",
            color: payPeriod === 36 ? "#000" : "#666",
          }}
        >
          36개월
        </button>
      </div>
    </>
  );
}

export default PayPeriodDetail;
