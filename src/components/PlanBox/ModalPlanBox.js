import styles from "./ModalPlanBox.module.css";
import { Box, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Button,
} from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changePlan,
  changeDiscount,
  changeBrand,
  changeStorage,
  changeProductSort,
  resetData,
} from "../../actions";

function ModalPlanBox({ plan, i }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [planModalValue, setPlanModalValue] = useState("0");
  const [sortValue, setSotrValue] = useState("0");
  const onChangeSortValue = (e) => {
    dispatch(changeProductSort(e.target.value));
    setSotrValue(e.target.value);
  };

  return (
    <div>
      <Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className={styles.ModalContent}>
          <ModalHeader className={styles.ModalHeader}>전체 요금제</ModalHeader>
          <ModalCloseButton />
          <div className={styles.HeaderMenu}>
            <div className={styles.HeaderSortContainer}>
              <div className={styles.HeaderSelectSort}>
                <Select value={sortValue} onChange={onChangeSortValue}>
                  <option value="0">많은 데이터 사용량 순</option>
                  <option value="1">적은 데이터 사용량 순</option>
                  <option value="2">높은 가격 순</option>
                  <option value="3">낮은 가격 순</option>
                </Select>
              </div>
            </div>
            <div className={styles.HeaderMenuNav}>
              <div className={styles.HeaderLeftMenu}>
                <div className={styles.NavItem}>요금제</div>
              </div>
              <div className={styles.HeaderRightMenu}>
                <div className={styles.NavItem}>데이터</div>
                <div className={styles.NavItem}>나눠쓰기</div>
                <div className={styles.NavItem}>음성통화</div>
                <div className={styles.NavItem}>메세지</div>
              </div>
            </div>
          </div>
          <ModalBody className={styles.ModalBody}>
            <RadioGroup
              onChange={setPlanModalValue}
              value={planModalValue}
              className={styles.PlanContainer}
            >
              <Stack className={styles.PlanContainerStack}>
                {plan.map((p, i) => {
                  return (
                    <div className={styles.PlanItemContainer} key={i}>
                      <div className={styles.PlanInfoContainer} key={i}>
                        <Radio
                          className={styles.PlanItem}
                          value={p.code}
                          size="lg"
                        >
                          <div className={styles.PlanInfo}>
                            <div className={styles.PlanMain}>
                              <div className={styles.PlanName}>{p.name}</div>
                              <div className={styles.PlanPrice}>
                                {convertNumber(p.price)}원
                              </div>
                            </div>

                            <div className={styles.PlanDetail}>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.data)}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.shareData)}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.voice)}분
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.message)}건
                              </div>
                            </div>
                          </div>
                        </Radio>
                      </div>
                    </div>
                  );
                })}
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter className={styles.ModalFooter}>
            <div className={styles.FooterInfo}>
              <ul className={styles.FooterInfoUL}>
                <li className={styles.FooterInfoLI}>
                  • 정액은 부가세 포함 금액입니다.
                </li>
                <li className={styles.FooterInfoLI}>
                  • 안내된 요금제 외 가입 가능한 요금제는 별도 상담을 통해 안내
                  받으실 수 있습니다.
                </li>
              </ul>
            </div>
            <div className={styles.FooterBtnContainer}>
              <Button onClick={onClose} className={styles.FooterCancelBtn}>
                취소
              </Button>
              <Button onClick={onApplyPlan} className={styles.FooterApplyBtn}>
                적용
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalPlanBox;
