// 상품 리스트 페이지 내 옵션 아코디언

import React, { useEffect, useState } from "react";
import styles from "./Option.module.css";
import { useSelector, useDispatch } from "react-redux";
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  changePlan,
  changeDiscount,
  changeBrand,
  changeStorage,
  changeOptions,
} from "../../actions";
import ModalPlanBox from "../PlanBox/ModalPlanBox";

function Option({ plans }) {
  const dispatch = useDispatch();

  // Redux Options
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 모달 open/close 함수
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 현재 선택된 요금제, 할인 유형, 제조사, 저장용량 변수
  const [planValue, setPlanValue] = useState(options.planType);
  const [planModalValue, setPlanModalValue] = useState(options.planType);
  const [discountValue, setDiscountValue] = useState(options.discountType);
  const [brandValue, setBrandValue] = useState(options.brandType);
  const [storageValue, setStorageValue] = useState(options.storageType);

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
    //console.log(value);
    dispatch(changeBrand(value));
    setBrandValue(value);
  };
  const onChangeStorageValue = (value) => {
    dispatch(changeStorage(value));
    setStorageValue(value);
  };
  const onChangeOptions = () => {
    const value = {
      planType: planValue,
      discountType: discountValue,
      brandType: brandValue,
      storageType: storageValue,
    };
    dispatch(changeOptions(value));
  };

  useEffect(() => {
    setPlanValue(options.planType);
  }, [options.planType]);

  // 요금제 미리보기 리스트 - 최대 3개로 제한
  const [planPreviewList, setPlanPreviewList] = useState(plans.slice(0, 3));

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
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
                  // 더 많은 요금제 보기에서 선택한 값이 미리보기 요금제에 없으면 추가
                  !planPreviewList.includes(findSelectPlan(planValue)) && (
                    <div className={styles.AdditionalPlan}>
                      <Radio value={planValue}>
                        {findSelectPlan(planValue).name}
                      </Radio>
                    </div>
                  )}
                {/* 최대 3개의 미리보기 요금제 */}
                {planPreviewList.map((p, i) => {
                  return (
                    <Radio value={p.code} key={i}>
                      {p.name}
                    </Radio>
                  );
                })}
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
                <Radio value="1">64GB</Radio>
                <Radio value="2">128GB</Radio>
                <Radio value="3">256GB</Radio>
                <Radio value="4">512GB 이상</Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* 더 많은 요금제 보기 모달 */}
      {isOpen && (
        <ModalPlanBox
          isOpen={isOpen}
          onClose={onClose}
          plans={plans}
          planType={planValue}
          actionFunc={changePlan}
        />
      )}
    </div>
  );
}

export default Option;
