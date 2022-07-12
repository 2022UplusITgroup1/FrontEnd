import React from "react";
import styles from "./Product.module.css";
import { Box, Image } from "@chakra-ui/react";

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
    <div className={styles.Container}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image
          className={styles.ProductImg}
          src={property.imageUrl}
          alt={property.imageAlt}
        />

        <Box p="6">
          <Box
            mt="1"
            fontWeight="bold"
            fontSize="large"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}
          </Box>
          <Box fontSize="x-small">{property.subTitle}</Box>
          <Box>
            <Box fontSize="small">휴대폰 월 {property.phone}원</Box>
            <Box fontSize="small">통신료 월 {property.communication}원</Box>
          </Box>
          <Box fontWeight="bold">
            월 {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              원
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            버튼
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Product;
