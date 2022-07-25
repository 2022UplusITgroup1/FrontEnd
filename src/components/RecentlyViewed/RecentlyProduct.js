// 최근 본 상품 전체 보기 모달 내 상품 Box

import React from "react";
import styles from "./RecentlyProduct.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";
import mapDiscountType from "../../utils/mapDiscountType";

function RecentlyProduct({
  productCode,
  productName,
  productPrice,
  productImgThumbnail,
  planCode,
  planName,
  planPrice,
  discountType,
  color,
  category,
  monthPrice,
}) {
  // 최근 본 상품은 고정 값이므로 일반 변수 사용
  let DETAIL_URL = "";
  if (discountType === "0") {
    DETAIL_URL = `/mobile/detail/${category}/${planCode}/${productCode}/${color}/${discountType}`;
  } else {
    DETAIL_URL = `/mobile/detail/${category}/${planCode}/${productCode}/${color}/${discountType}`;
  }

  // 계약기간 => 기본 = 24, 선택약정12개월 = 12
  // let payPeriod = discountType === "3" ? 12 : 24;
  // const nowTotalPrice = calcPrices(
  //   product.price,
  //   plan.price,
  //   discountType,
  //   payPeriod
  // );

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
              src={productImgThumbnail}
              alt={productName}
            />
          </Box>
          <Box className={styles.ProductTitle}>{productName}</Box>
          <Box className={styles.ProductSubTitle}>
            {planName}
            <div className={styles.ProductDiscountType}>
              {mapDiscountType(discountType)}
            </div>
          </Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to={DETAIL_URL} style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>
              휴대폰 월 {convertNumber(productPrice)}원
              {discountType === "1" && (
                <span className={styles.Discount}> (30% ↓)</span>
              )}
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {convertNumber(planPrice)}원
              {(discountType === "2" || discountType === "3") && (
                <span className={styles.Discount}> (25% ↓)</span>
              )}
            </Box>
            <Box className={styles.MonthPrice}>
              월 {convertNumber(monthPrice)}원
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default RecentlyProduct;
