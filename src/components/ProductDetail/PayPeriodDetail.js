// 상세 페이지 > 할부기간

import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions, selectDetail } from "../../actions";
import { RadioGroup, Radio, useDisclosure } from "@chakra-ui/react";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";

function PayPeriodDetail({ data, plan }) {
  const dispatch = useDispatch();
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  const [payPeriod, setPayPeriod] = useState(orderProduct.payPeriod);
  // 할인 유형 변경
  const onChangePayPeriod = (value) => {
    setPayPeriod(value);
  };

  // Redux Dispatch -> 주문 정보 저장
  const onSelectDetail = (nowPlan, nowPlanPrice) => {
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
      monthPrice: calcDiscountPrice(orderProduct.discountType, nowPlanPrice)
        .total,
      payPeriod: payPeriod,
    };
    dispatch(selectDetail(value));
  };

  // 할부기간 변경할 때마다 redux 에 update
  useEffect(() => {
    const nowPlanPrice = calcMonthPrice(
      data.phone.price,
      plan.price,
      payPeriod
    );
    onSelectDetail(plan, nowPlanPrice);
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
