import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions } from "../../actions";
import { RadioGroup, Radio, useDisclosure } from "@chakra-ui/react";

function DiscountDetail({
  data,
  plan,
  discountValue,
  setDiscountValue,
  onChangeDiscountValue,
}) {
  return (
    <>
      <RadioGroup
        onChange={onChangeDiscountValue}
        value={discountValue}
        className={styles.OrderInfoTdInner}
      >
        <div
          className={styles.OrderInfoTdLeftContainer}
          style={{
            borderColor: discountValue === "1" ? "#000" : "#ddd",
            color: discountValue === "1" ? "#000" : "#666",
          }}
        >
          <Radio opacity={0} value="1" onClick={(e) => setDiscountValue("1")}>
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
            borderColor: discountValue !== "1" ? "#000" : "#ddd",
            color: discountValue !== "1" ? "#000" : "#666",
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
