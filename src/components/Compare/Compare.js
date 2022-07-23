// 비교하기

import React, { useState, useEffect } from "react";
import styles from "./Compare.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@chakra-ui/react";
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
import { setCompareModalIsOpen } from "../../actions";

function Compare({ isOpen, onClose }) {
  //console.log(isOpen);
  const dispatch = useDispatch();
  // 이름 바꾸기
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();
  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer);
  //console.log(compares.items);
  // console.log(isOpenDetail);

  const onClickCompareDetail = (e) => {
    if (compares.items.length < 2) {
      // alert
      alert("2개 이상의 상품을 선택 하셔야 비교하기가 가능합니다.");
    } else {
      onOpenDetail();
    }
  };

  // CompareMiniBox 가 다 사라질 경우 모달창 닫기
  useEffect(() => {
    if (compares.items.length === 0) {
      dispatch(setCompareModalIsOpen(false));
    }
  }, [compares.items]);

  // 비교할 값이 없으면 return null
  if (!isOpen) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.Modal}>
        <div className={styles.ModalContent}>
          <div className={styles.ModalHeader}>
            <div className={styles.ModalHeaderTxt}>
              비교하기 ({compares.items.length})
            </div>
            {/* <button>V</button> */}
          </div>
          <div className={styles.ModalBodyContainer}>
            <div className={styles.ModalBody}>
              {compares.items &&
                compares.items.map((c, i) => {
                  return <CompareMiniBox data={c} key={i} />;
                })}
            </div>
            <div className={styles.CompareBtnContainer}>
              <Button
                onClick={onClickCompareDetail}
                className={styles.CompareBtn}
              >
                비교하기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* {isOpenDetail && (
        <CompareDetail isOpen={isOpenDetail} onClose={onCloseDetail} />
      )} */}
    </div>
  );
}

export default Compare;

/*
<Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
      >
        <ModalContent className={styles.ModalContent}>
          <ModalHeader className={styles.ModalHeader}>비교하기</ModalHeader>
          <ModalCloseButton />
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
*/
