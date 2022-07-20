// 최근 본 상품 전체 보기 모달 내 상품 Box

import React, { useEffect, useState } from "react";
import styles from "./RecentlyProduct.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";

function RecentlyProduct({ product, plan, discountValue, color, category }) {
  // 최근 본 상품은 고정 값이므로 일반 변수 사용
  let DETAIL_URL = "";
  if (discountValue === "0") {
    DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${color}/${product.discountType}`;
  } else {
    DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${color}/${discountValue}`;
  }

  // 상품 요금제 & 할인 유형 기반 월별 요금 계산
  const prices = calcMonthPrice(product.price, plan.price);
  const nowPrice = calcDiscountPrice(discountValue.toString(), prices);

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
          <Box className={styles.ProductSubTitle}>
            {plan.name}
            <div className={styles.ProductDiscountType}>{nowPrice.name}</div>
          </Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>
              휴대폰 월 {convertNumber(nowPrice.phone)}원
              {discountValue === "1" && (
                <span className={styles.Discount}> (30% ↓)</span>
              )}
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {convertNumber(nowPrice.plan)}원
              {(discountValue === "2" || discountValue === "3") && (
                <span className={styles.Discount}> (25% ↓)</span>
              )}
            </Box>
            <Box className={styles.MonthPrice}>
              월 {convertNumber(nowPrice.total)}원
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default RecentlyProduct;
