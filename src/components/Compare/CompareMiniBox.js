// 비교하기 하단 모달 상품 Box

import React from "react";
import styles from "./CompareMiniBox.module.css";
import { useDispatch } from "react-redux";
import { Box, Image } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import { deleteCompareProduct } from "../../actions";

const IMAGE_URI = `${process.env.REACT_APP_IMAGE_URI}`;

function CompareMiniBox({ data }) {
  const dispatch = useDispatch();

  const onClickCloseBtn = (e) => {
    // 비교하기 상품 삭제
    dispatch(deleteCompareProduct(data.code));
  };

  return (
    <>
      <Box
        className={styles.Container}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <div className={styles.Content}>
          <Image
            className={styles.ProductImg}
            src={`${IMAGE_URI}${data.imgThumbnail}`}
            alt={data.name}
          />
          <div className={styles.TxtContainer}>
            <div>{data.name}</div>
            <div>{convertNumber(data.totalPrice)} 원</div>
          </div>
          <button className={styles.CloseBtn} onClick={onClickCloseBtn}>
            ✕
          </button>
        </div>
      </Box>
    </>
  );
}

export default CompareMiniBox;
