// 최근 본 상품 전체 보기 모달 내 상품 Box

import React from "react";
import styles from "./RecentlyProduct.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";

function RecentlyProduct({ product, plan, discountType, color, category }) {
  // 최근 본 상품은 고정 값이므로 일반 변수 사용
  let DETAIL_URL = "";
  if (discountType === "0") {
    DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${color}/${product.discountType}`;
  } else {
    DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${color}/${discountType}`;
  }

  // 상품 요금제 & 할인 유형 기반 월별 요금 계산
  const nowPrice = calcPrices(product.price, plan.price, discountType, 12);

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
            <div className={styles.ProductDiscountType}>
              {nowPrice.discountName}
            </div>
          </Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>
              휴대폰 월 {convertNumber(nowPrice.monthPhonePrice)}원
              {discountType === "1" && (
                <span className={styles.Discount}> (30% ↓)</span>
              )}
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {convertNumber(nowPrice.monthPlanPrice)}원
              {(discountType === "2" || discountType === "3") && (
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
