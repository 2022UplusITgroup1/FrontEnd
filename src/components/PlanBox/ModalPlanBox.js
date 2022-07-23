// 요금제 더 보기 모달

import React, { useEffect, useState } from "react";
import styles from "./ModalPlanBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
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
import {
  changeDetailPlanType,
  changePlan,
  changePlanSort,
} from "../../actions";
import convertNumber from "../../utils/convertNumber";

function ModalPlanBox({ isOpen, onClose, plans, planType, actionFunc }) {
  const dispatch = useDispatch();

  // 모달에서 선택한 요금제 값
  const [planModalValue, setPlanModalValue] = useState(
    planType === "0" ? plans[0].code : planType
  );

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  // Redux PlanCode 변경
  const onChangePlanType = (value) => {
    if (actionFunc === changePlan) {
      // 선택한 요금제로 option 에 적용
      dispatch(actionFunc(value));
    } else if (actionFunc === changeDetailPlanType) {
      // 선택한 요금제로 detail 에 적용
      const findPlan = findSelectPlan(value);
      // Redux Plan 형식에 맞게 가공해서 update
      const planValue = {
        code: findPlan.code,
        name: findPlan.name,
        price: findPlan.price,
      };
      dispatch(actionFunc(planValue));
    }
    setPlanModalValue(value);
  };

  // 적용 하고 Close
  const onClickApplyBtn = () => {
    onChangePlanType(planModalValue);
    dispatch(changePlanSort("0")); // 닫으면 정렬조건 초기화
    onClose();
  };

  // 적용 없이 Close
  const onClickCloseBtn = () => {
    dispatch(changePlanSort("0")); // 닫으면 정렬조건 초기화
    onClose();
  };

  const planSort = useSelector((state) => state.changePlanReducer);
  //console.log(planSort);

  const [sortType, setSortType] = useState("0");
  const [sortedPlans, setSortedPlans] = useState(plans);

  // 요금제 정렬 값 변경
  const onChangePlanSortType = (e) => {
    //console.log("변경 " + e.target.value);
    dispatch(changePlanSort(e.target.value));
    setSortType(e.target.value);
  };

  // MYSEO CREATED - 요금제 정렬
  const sortArray = (type) => {
    const types = {
      0: "data",
      1: "data",
      2: "price",
      3: "price",
    };
    const sortProperty = types[type];
    let sortDirection = 0; // 0: DESC , 1: ASC
    if (type === 1 || type === 3) sortDirection = 1;
    let sorted = [...sortedPlans]; // 복사해서 사용해야 기존 값에 영향 X
    sorted = sorted.sort((a, b) =>
      sortDirection === 0
        ? b[sortProperty] - a[sortProperty]
        : a[sortProperty] - b[sortProperty]
    );
    setSortedPlans(sorted);
    //console.log("sort! ");
  };

  useEffect(() => {
    sortArray(Number(sortType));
  }, [sortType]);

  return (
    <>
      <Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className={styles.ModalContent}>
          <ModalHeader className={styles.ModalHeader}>전체 요금제</ModalHeader>
          <ModalCloseButton onClick={onClickCloseBtn} />
          <div className={styles.HeaderMenu}>
            <div className={styles.HeaderSortContainer}>
              <div className={styles.HeaderSelectSort}>
                <Select value={sortType} onChange={onChangePlanSortType}>
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
                {sortedPlans.map((p, i) => {
                  //console.log("render" + p.code + p.name);
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
                                {p.data < 300
                                  ? convertNumber(p.data) + "GB"
                                  : "무제한"}
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {p.shareData !== 0
                                  ? convertNumber(p.shareData) + "GB"
                                  : "사용가능"}
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {p.voice < 600 ? (
                                  convertNumber(p.voice) + "분"
                                ) : (
                                  <div
                                    className={styles.VoiceInfinityContainer}
                                  >
                                    <div className={styles.VoiceInfinityTop}>
                                      집/이동전화
                                    </div>
                                    <div className={styles.VoiceInfinityBottom}>
                                      무제한
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {p.message < 500
                                  ? convertNumber(p.message) + "건"
                                  : "기본제공"}
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
              <Button
                onClick={onClickCloseBtn}
                className={styles.FooterCancelBtn}
              >
                취소
              </Button>
              <Button
                onClick={onClickApplyBtn}
                className={styles.FooterApplyBtn}
              >
                적용
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPlanBox;
