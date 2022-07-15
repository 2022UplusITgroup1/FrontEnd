import styles from "./ModalPlanBox.module.css";
import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";

function ModalPlanBox({ plan, i }) {
  return (
    <div>
      <div className={styles.PlanItemContainer}>
        <div className={styles.PlanInfoContainer}>
          <Radio className={styles.PlanItem} value={i} size="lg">
            <div className={styles.PlanInfo}>
              <div className={styles.PlanMain}>
                <div className={styles.PlanName}>{plan.name}</div>
                <div className={styles.PlanPrice}>{plan.price}원</div>
              </div>

              <div className={styles.PlanDetail}>
                <div className={styles.PlanDetailItem}>{plan.data}GB</div>
                <div className={styles.PlanDetailItem}>{plan.shareData}GB</div>
                <div className={styles.PlanDetailItem}>{plan.voice}분</div>
                <div className={styles.PlanDetailItem}>{plan.message}건</div>
              </div>
            </div>
          </Radio>
        </div>
      </div>
    </div>
  );
}

export default ModalPlanBox;
