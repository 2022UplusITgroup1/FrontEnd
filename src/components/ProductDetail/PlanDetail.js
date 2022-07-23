// 상세 페이지 > 현재 요금제 Box

import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions } from "../../actions";
import { Stack, useDisclosure } from "@chakra-ui/react";

function PlanDetail({ plan }) {
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);
  return (
    <>
      <Stack className={styles.OrderPlanContainerStack}>
        <div className={styles.OrderPlanItemContainer}>
          <div className={styles.OrderPlanInfoContainer}>
            {/*createPlanPreview(plans, onPlanValueChange)*/}
            <div className={styles.OrderPlanItem} value={plan.code} size="lg">
              <div className={styles.OrderPlanInfo}>
                <div className={styles.OrderPlanMain}>
                  <div className={styles.OrderPlanName}>{plan.name}</div>
                  <div className={styles.OrderPlanPrice}>
                    {convertNumber(Number(plan.price))}원
                  </div>
                </div>

                <div className={styles.OrderPlanDetail}>
                  <div className={styles.OrderPlanDetailItem}>
                    {convertNumber(Number(plan.data))}GB
                    <div className={styles.OrderPlanDetailHeader}>데이터</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {convertNumber(Number(plan.shareData))}GB
                    <div className={styles.OrderPlanDetailHeader}>나눠쓰기</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {convertNumber(Number(plan.voice))}분
                    <div className={styles.OrderPlanDetailHeader}>음성통화</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {convertNumber(Number(plan.message))}건
                    <div className={styles.OrderPlanDetailHeader}>메세지</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

export default PlanDetail;
