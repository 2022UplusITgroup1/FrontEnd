// 상세 페이지 > 할인유형

import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import { selectDetail } from "../../actions";
import { RadioGroup, Radio } from "@chakra-ui/react";
import calcPrices from "../../utils/calcPrices";

function DiscountDetail({ data, plan }) {
  const dispatch = useDispatch();
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // 할인 유형
  const [discountType, setDiscountType] = useState(orderProduct.discountType);
  const onChangeDiscountType = (value) => {
    setDiscountType(value);
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
      discountType: discountType,
      monthPrice: nowTotalPrice.total,
      payPeriod: orderProduct.payPeriod,
    };
    dispatch(selectDetail(value));
  };

  // 할인 유형 변경할 때마다 redux 에 update
  useEffect(() => {
    const nowTotalPrice = calcPrices(
      data.phone.price,
      plan.price,
      discountType,
      orderProduct.payPeriod
    );
    onSelectDetail(plan, nowTotalPrice);
  }, [discountType]);

  return (
    <>
      <RadioGroup
        onChange={onChangeDiscountType}
        value={discountType}
        className={styles.OrderInfoTdInner}
      >
        <div
          className={styles.OrderInfoTdLeftContainer}
          style={{
            borderColor: discountType === "1" ? "#000" : "#ddd",
            color: discountType === "1" ? "#000" : "#666",
          }}
        >
          <Radio opacity={0} value="1" onClick={(e) => setDiscountType("1")}>
            <div className={styles.OrderInfoTdLeft}>
              {/* 공시지원금 */}
              <div>
                <div className={styles.DiscountTypeTitle}>공시지원금</div>
                <div>휴대폰 가격 1회 할인</div>
              </div>
              <div className={styles.PublicPrice}>
                총 -
                {data.phone.code &&
                  convertNumber(Number(data.phone.price * 0.3))}{" "}
                원
              </div>
            </div>
          </Radio>
        </div>
        <div
          className={styles.OrderInfoTdRightContainer}
          style={{
            borderColor: discountType !== "1" ? "#000" : "#ddd",
            color: discountType !== "1" ? "#000" : "#666",
          }}
        >
          <div className={styles.OrderInfoTdRight}>
            {/* 선택약정할인 */}
            <div className={styles.DiscountTypeTitle}>선택약정할인</div>
            <div>통신요금 25% 할인</div>
            <div className={styles.SelectPlan}>
              <Radio value="2" size="lg">
                24개월 할인
              </Radio>
              <span className={styles.SelectPlanPrice}>
                총 -{convertNumber(Number(plan.price * 24 * 0.25))} 원
              </span>
            </div>
            <div className={styles.SelectPlan}>
              <Radio value="3" size="lg">
                12개월 할인
              </Radio>
              <span className={styles.SelectPlanPrice}>
                총 -{convertNumber(Number(plan.price * 12 * 0.25))} 원
              </span>
            </div>
          </div>
        </div>
      </RadioGroup>
    </>
  );
}

export default DiscountDetail;
