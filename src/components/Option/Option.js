import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import styles from "./Option.module.css";

function Option({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planValue, setPlanValue] = useState("1");
  const [discountValue, setDiscountValue] = useState("1");
  const [maniValue, setManiValue] = useState("1");
  const [storageValue, setStorageValue] = useState("1");
  const [totalPlanValue, setTotalPlanValue] = useState(0);
  const onTotalPlanValueChange = (value) => {
    console.log(value);
    setTotalPlanValue(value);
  };
  const createPlanPreview = () => {
    const planPreviewList = [];
    let len = 3;
    if (data.length < 3) len = data.length;
    for (let i = 0; i < len; i++) {
      planPreviewList.push(
        <Radio value={data[i].code} key={i}>
          {data[i].name}
        </Radio>
      );
    }
    return planPreviewList;
  };

  const [isSelect, setIsSelect] = useState("0");
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <Accordion defaultIndex={[0]} allowMultiple>
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
            <RadioGroup onChange={setPlanValue} value={planValue}>
              <Stack className={styles.RatePlan}>
                <Radio value="1">가장 알맞은 요금제</Radio>
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
            <RadioGroup onChange={setDiscountValue} value={discountValue}>
              <Stack>
                <Radio value="1">추천</Radio>
                <Radio value="2">공시지원금</Radio>
                <Radio value="3">선택약정24개월</Radio>
                <Radio value="4">선택약정12개월</Radio>
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
            <RadioGroup onChange={setManiValue} value={maniValue}>
              <Stack>
                <Radio value="1">전체</Radio>
                <Radio value="2">삼성</Radio>
                <Radio value="3">애플</Radio>
                <Radio value="4">기타</Radio>
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
            <RadioGroup onChange={setStorageValue} value={storageValue}>
              <Stack>
                <Radio value="1">전체</Radio>
                <Radio value="2">1TB</Radio>
                <Radio value="3">512GB 이상</Radio>
                <Radio value="4">256GB</Radio>
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
                <Select value={isSelect} onChange={onSelectChange}>
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
              onChange={setTotalPlanValue}
              value={totalPlanValue}
              className={styles.PlanContainer}
            >
              <Stack className={styles.PlanContainerStack}>
                {data.map((plan, i) => {
                  return (
                    <div className={styles.PlanItemContainer} key={i}>
                      <div className={styles.PlanInfoContainer} key={i}>
                        <Radio className={styles.PlanItem} value={i} size="lg">
                          <div className={styles.PlanInfo}>
                            <div className={styles.PlanMain}>
                              <div className={styles.PlanName}>{plan.name}</div>
                              <div className={styles.PlanPrice}>
                                {plan.price}원
                              </div>
                            </div>

                            <div className={styles.PlanDetail}>
                              <div className={styles.PlanDetailItem}>
                                {plan.data}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {plan.shareData}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {plan.voice}분
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {plan.message}건
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
              <Button onClick={onClose} className={styles.FooterApplyBtn}>
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
{data.map((plan, i) => {
  return (<Radio value={plan.code} key={i}>{plan.name}</Radio>);
})} 
*/
