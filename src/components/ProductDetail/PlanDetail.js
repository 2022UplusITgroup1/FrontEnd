// 상세 페이지 > 현재 요금제 Box

import React from "react";
import styles from "../../pages/Detail/Detail.module.css";
import convertNumber from "../../utils/convertNumber";
import { Stack } from "@chakra-ui/react";

function PlanDetail({ plan }) {
  if (!plan) return null;

  return (
    <>
      <Stack className={styles.OrderPlanContainerStack}>
        <div className={styles.OrderPlanItemContainer}>
          <div className={styles.OrderPlanInfoContainer}>
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
                    {plan.data < 300
                      ? convertNumber(plan.data) + "GB"
                      : "무제한"}
                    <div className={styles.OrderPlanDetailHeader}>데이터</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {convertNumber(Number(plan.shareData))}GB
                    <div className={styles.OrderPlanDetailHeader}>나눠쓰기</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {plan.voice < 600
                      ? convertNumber(plan.voice) + "분"
                      : "무제한"}
                    <div className={styles.OrderPlanDetailHeader}>음성통화</div>
                  </div>
                  <div className={styles.OrderPlanDetailItem}>
                    {plan.message < 1050
                      ? convertNumber(plan.message) + "건"
                      : "무제한"}
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
