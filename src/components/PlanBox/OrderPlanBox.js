import styles from "./OrderPlanBox.module.css";
import { Box, Radio, RadioGroup, Stack, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import convertNumber from "../../utils/convertNumber";

function OrderPlanBox({ data }) {
  const [planValue, setPlanValue] = useState(0);
  const onPlanValueChange = (v) => {
    setPlanValue(v);
  };
  const createPlanPreview = () => {
    const planPreviewList = [];
    let len = 3;
    if (data.length < 3) len = data.length;
    for (let i = 0; i < len; i++) {
      planPreviewList.push(
        <div
          className={styles.OrderPlanItem}
          value={i}
          key={i}
          size="lg"
          onClick={onPlanValueChange}
        >
          <div className={styles.OrderPlanInfo}>
            <div className={styles.OrderPlanMain}>
              <div className={styles.OrderPlanName}>{data[i].name}</div>
              <div className={styles.OrderPlanPrice}>{convertNumber(data[i].price)}원</div>
            </div>

            <div className={styles.OrderPlanDetail}>
              <div className={styles.OrderPlanDetailItem}>{convertNumber(data[i].data)}GB</div>
              <div className={styles.OrderPlanDetailItem}>
                {convertNumber(data[i].shareData)}GB
              </div>
              <div className={styles.OrderPlanDetailItem}>
                {convertNumber(data[i].voice)}분
              </div>
              <div className={styles.OrderPlanDetailItem}>
                {convertNumber(data[i].message)}건
              </div>
            </div>
          </div>
        </div>
      );
    }
    return planPreviewList;
  };

  return (
    <Stack className={styles.OrderPlanContainerStack}>
      <div className={styles.OrderPlanItemContainer}>
        <div className={styles.OrderPlanInfoContainer}>
          {createPlanPreview()}
        </div>
      </div>
    </Stack>
  );
}

export default OrderPlanBox;
