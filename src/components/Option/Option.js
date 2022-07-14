import React, { useState } from "react";
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
} from "@chakra-ui/react";
import styles from "./Option.module.css";

function Option({ category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planValue, setPlanValue] = useState("1");
  const [discountValue, setDiscountValue] = useState("1");
  const [maniValue, setManiValue] = useState("1");
  const [storageValue, setStorageValue] = useState("1");
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
                <Radio value="2">5G 프리미어 에센셜</Radio>
                <Radio value="3">5G 슬림+</Radio>
                <Radio value="4">5G 다이렉트 37.5</Radio>
                <Button className={styles.MoreBtn} onClick={onOpen}>
                  더 많은 요금제 보기
                </Button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>전체 요금제</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>요금제 리스트</ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
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
    </div>
  );
}

export default Option;
