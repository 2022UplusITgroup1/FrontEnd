import React, { useState, useEffect } from "react";
import styles from "./CompareDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

function CompareDetail({ data, isOpen, onClose }) {
  console.log(data);
  return (
    <Modal
      className={styles.Modal}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className={styles.ModalContent}>
        <ModalHeader className={styles.ModalHeader}>비교결과</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.ModalBody}>
          <div className={styles.ProductInfo}>
            {/* 상품 소개 */}
            {data &&
              data.map((d, i) => {
                return (
                  <Box key={i} className={styles.ProductInfoBox}>
                    <div className={styles.ProductImgContainer}>
                      <Image
                        className={styles.ProductImg}
                        src={d.imgThumbnail}
                        alt={d.name}
                      />
                    </div>
                    <div className={styles.ProductInfoTxt}>
                      <div>{d.name}</div>
                      <div>월 {d.totalPrice}원</div>
                    </div>
                    <Button onClick={onClose} className={styles.ReadMoreBtn}>
                      자세히보기
                    </Button>
                  </Box>
                );
              })}
          </div>
          <div>월 납부금액</div>
          <div>할인유형, 요금제</div>
        </ModalBody>
        <ModalFooter className={styles.ModalFooter}>
          <div className={styles.FooterBtnContainer}>
            <Button onClick={onClose} className={styles.FooterCancelBtn}>
              확인
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CompareDetail;
