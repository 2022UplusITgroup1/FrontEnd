import React, { useEffect, useState } from "react";
import styles from "./Option.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import { useSelector, useDispatch } from "react-redux";
import {
  changePlan,
  changeDiscount,
  changeBrand,
  changeStorage,
  changeProductSort,
  resetData,
} from "../../actions";

function Option({ plan }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [planValue, setPlanValue] = useState("0");
  const [planModalValue, setPlanModalValue] = useState("0");
  const [discountValue, setDiscountValue] = useState("0");
  const [brandValue, setBrandValue] = useState("0");
  const [storageValue, setStorageValue] = useState("0");
  const [sortValue, setSotrValue] = useState("0");
  const [isAdditional, setIsAdditional] = useState(0);
  let planPreviewList = plan.slice(0, 3);

  const onApplyPlan = () => {
    onChangePlanValue(planModalValue);
    onClose();
  };
  const onChangePlanValue = (value) => {
    dispatch(changePlan(value));
    setPlanValue(value);
    setPlanModalValue(value);
  };
  const onChangeDiscountValue = (value) => {
    dispatch(changeDiscount(value));
    setDiscountValue(value);
  };
  const onChangeBrandValue = (value) => {
    dispatch(changeBrand(value));
    setBrandValue(value);
  };
  const onChangeStorageValue = (value) => {
    dispatch(changeStorage(value));
    setStorageValue(value);
  };
  const onChangeSortValue = (e) => {
    dispatch(changeProductSort(e.target.value));
    setSotrValue(e.target.value);
  };
  useEffect(() => {
    // 초기 렌더링 시, 초기화
    // 페이지를 이동해도 유지하고 싶다면 초기화 X + useSelector 값 이용
    dispatch(resetData());
  }, []);

  const createPlanPreview = () => {
    const previewList = [];
    let len = 3;
    if (plan.length < 3) len = plan.length;
    for (let i = 0; i < len; i++) {
      previewList.push(
        <Radio value={plan[i].code} key={i}>
          {plan[i].name}
        </Radio>
      );
    }
    return previewList;
  };
  const findSelectPlan = (value) => {
    return plan.find((p) => p.code === value);
  };

  return (
    <div className={styles.Container}>
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                요금제
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <RadioGroup onChange={onChangePlanValue} value={planValue}>
              <Stack className={styles.RatePlan}>
                <Radio value="0">가장 알맞은 요금제</Radio>
                {planValue !== "0" &&
                  !planPreviewList.includes(findSelectPlan(planValue)) && (
                    <div className={styles.AdditionalPlan}>
                      <Radio value={planValue}>
                        {findSelectPlan(planValue).name}
                      </Radio>
                    </div>
                  )}
                {createPlanPreview()}
                <Button className={styles.MoreBtn} onClick={onOpen}>
                  더 많은 요금제 보기
                </Button>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                할인 유형
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <RadioGroup onChange={onChangeDiscountValue} value={discountValue}>
              <Stack>
                <Radio value="0">추천</Radio>
                <Radio value="1">공시지원금</Radio>
                <Radio value="2">선택약정24개월</Radio>
                <Radio value="3">선택약정12개월</Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                제조사
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <RadioGroup onChange={onChangeBrandValue} value={brandValue}>
              <Stack>
                <Radio value="0">전체</Radio>
                <Radio value="1">삼성</Radio>
                <Radio value="2">애플</Radio>
                <Radio value="3">기타</Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                저장용량
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <RadioGroup onChange={onChangeStorageValue} value={storageValue}>
              <Stack>
                <Radio value="0">전체</Radio>
                <Radio value="1000">1TB</Radio>
                <Radio value="512">512GB 이상</Radio>
                <Radio value="256">256GB</Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* 더 많은 요금제 보기 모달 */}
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

export default Option;

/*
요금제 길이 제한 X
{plan.map((plan, i) => {
  return (<Radio value={plan.code} key={i}>{plan.name}</Radio>);
})} 
*/
