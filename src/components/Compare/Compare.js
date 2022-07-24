// 비교하기 하단 모달

import React, { useEffect } from "react";
import styles from "./Compare.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import CompareDetail from "../CompareDetail/CompareDetail";
import CompareMiniBox from "./CompareMiniBox";
import {
  resetCompareDetailData,
  setCompareDetailProducts,
  setCompareModalIsOpen,
} from "../../actions";

function Compare({ isOpen, onClose }) {
  //console.log(isOpen);
  const dispatch = useDispatch();

  // CompareDetail
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer);
  //console.log(compares.items);
  //console.log("isOPEN!!!!" + isOpenDetail);

  const onClickCompareDetail = (e) => {
    if (compares.items.length < 2) {
      alert("2개 이상의 상품을 선택 하셔야 비교하기가 가능합니다.");
    } else {
      // 상세 모달에서 보여줄 기본 아이템 저장
      console.log(compares.items);
      dispatch(setCompareDetailProducts(compares.items));
      onOpenDetail();
    }
  };

  const onCloseCompareDetail = () => {
    onCloseDetail();
    dispatch(resetCompareDetailData()); // 닫히면 초기화
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
          </div>
          <div className={styles.ModalBodyContainer}>
            <div className={styles.ModalBody}>
              {compares.items.length &&
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
      {isOpenDetail ? (
        <CompareDetail
          isOpen={isOpenDetail}
          onClose={onCloseCompareDetail}
          data={compares.items}
        />
      ) : null}
    </div>
  );
}

export default Compare;
