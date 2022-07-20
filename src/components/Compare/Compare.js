// 비교하기

import React, { useState, useEffect } from "react";
import styles from "./Compare.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  Stack,
  Radio,
  RadioGroup,
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
import CompareDetail from "./CompareDetail";
import CompareMiniBox from "./CompareMiniBox";

function Compare({ isOpen, onClose }) {
  // 이름 바꾸기
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();
  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer);
  console.log(compares.items);

  const onClickCompareDetail = (e) => {
    onOpenDetail();
  };

  return (
    <>
      <Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <ModalContent className={styles.ModalContent}>
          <ModalHeader className={styles.ModalHeader}>비교하기</ModalHeader>
          <ModalCloseButton /> {/* 밑으로 내리기 */}
          <div className={styles.ModalBodyContainer}>
            <ModalBody className={styles.ModalBody}>
              {compares.items &&
                compares.items.map((c, i) => {
                  return <CompareMiniBox data={c} key={i} />;
                })}
            </ModalBody>
            <div className={styles.CompareBtnContainer}>
              <Button onClick={onOpenDetail} className={styles.CompareBtn}>
                비교하기
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <CompareDetail
        data={compares.items}
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
      />
    </>
  );
}

export default Compare;

/*
<h1>Compare</h1>
      <button onClick={onOpen}>비교하기</button>
      <CompareDetail isOpen={isOpen} onClose={onClose} />
*/
