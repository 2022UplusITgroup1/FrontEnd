import React, { useState } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import convertPrice from "../../utils/convertPrice";

function Product({ product }) {
  const DETAIL_URL = `/mobile/detail/${product.brand["name"]}/${product.code}/${product.color}/${product.discountType}`;

  return (
    <Box
      className={styles.Container}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
        <Box className={styles.BoxTop}>
          <Box className={styles.ImgBox}>
            <Image
              className={styles.ProductImg}
              src={product.imgThumbnail}
              alt={product.name}
            />
          </Box>
          <Box className={styles.ProductTitle}>{product.name}</Box>
          <Box className={styles.ProductSubTitle}>요금제 정보</Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>
              휴대폰 월 {convertPrice(product.price)}원
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {convertPrice(product.price)}원
            </Box>
            <Box className={styles.MonthPrice}>월 {convertPrice(product.price)}원</Box>
          </Box>
        </Link>

        <Box
          className={styles.Button}
          display="flex"
          mt="2"
          alignItems="center"
        >
          <Button className={styles.CompareBtn} borderRadius="50px">
            비교하기
          </Button>
          <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
            <Button className={styles.OrderBtn} borderRadius="50px">
              주문하기
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
