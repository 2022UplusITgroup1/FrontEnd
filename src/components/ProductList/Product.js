import React, { useState } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";

function Product() {
  const property = {
    imageUrl:
      "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-073051-526-l4VusvGl.jpg",
    imageAlt: "Galaxy Buddy 2",
    title: "Galaxy Buddy 2",
    subTitle: "5G 라이트+ | 공시지원금",
    phone: "0",
    communication: "55,000",
    formattedPrice: "55,000",
    reviewCount: 34,
    rating: 4,
  };
  return (
    <Box
      className={styles.Container}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Link to="/detail" style={{ textDecoration: "none" }}>
        <Box className={styles.BoxTop}>
          <Box className={styles.ImgBox}>
            <Image
              className={styles.ProductImg}
              src={property.imageUrl}
              alt={property.imageAlt}
            />
          </Box>
          <Box className={styles.ProductTitle}>{property.title}</Box>
          <Box className={styles.ProductSubTitle}>{property.subTitle}</Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to="/detail" style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>휴대폰 월 {property.phone}원</Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {property.communication}원
            </Box>
            <Box className={styles.MonthPrice}>
              월 {property.formattedPrice}원
            </Box>
          </Box>
        </Link>

        <Box
          className={styles.Button}
          display="flex"
          mt="2"
          alignItems="center"
        >
          <Button className={styles.CompareBtn}>비교하기</Button>
          <Button className={styles.OrderBtn}>주문하기</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
