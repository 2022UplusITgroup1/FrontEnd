import styles from "./ModalPlanBox.module.css";
import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";

function ModalPlanBox({ plan, i }) {
  return (
    <div>
      <div className={styles.PlanItemContainer}>
        <div className={styles.PlanInfoContainer}>
          <Radio className={styles.PlanItem} value={i} size="lg">
            <div className={styles.PlanInfo}>
              <div className={styles.PlanMain}>
                <div className={styles.PlanName}>{plan.name}</div>
                <div className={styles.PlanPrice}>{convertNumber(plan.price)}원</div>
              </div>

              <div className={styles.PlanDetail}>
                <div className={styles.PlanDetailItem}>{convertNumber(plan.data)}GB</div>
                <div className={styles.PlanDetailItem}>{convertNumber(plan.shareData)}GB</div>
                <div className={styles.PlanDetailItem}>{convertNumber(plan.voice)}분</div>
                <div className={styles.PlanDetailItem}>{convertNumber(plan.message)}건</div>
              </div>
            </div>
          </Radio>
        </div>
      </div>
    </div>
  );
}

export default ModalPlanBox;
