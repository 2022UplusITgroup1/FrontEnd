// 상품 리스트 페이지에서 보이는 최근 본 상품 미리보기 Box

import React from "react";
import styles from "./RecentlyPreviewProduct.module.css";
import { Link } from "react-router-dom";
import { GridItem, Box, Image } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";

const IMAGE_URI = `https://d2i7g6t0sifvpq.cloudfront.net`;

function RecentlyPreviewProduct({ product }) {
  //console.log(product);
  const DETAIL_URI = `/mobile/detail/${product.networkSupport}/${product.plan}/${product.code}/${product.color}/${product.discountType}`;

  return (
    <div className={styles.Container}>
      <Link to={DETAIL_URI}>
        <GridItem pl="1" area={"img"}>
          <Box className={styles.ImgBox}>
            <Image
              className={styles.ProductImg}
              src={`${IMAGE_URI}${product.imgThumbnail}`}
              alt={product.imgThumbnail}
            />
          </Box>
        </GridItem>
        <GridItem
          className={styles.Description}
          pl="1"
          bg="lightgray"
          area={"description"}
        >
          {product.name}
          <br />
          {convertNumber(product.totalPrice)} 원
        </GridItem>
      </Link>
    </div>
  );
}

export default RecentlyPreviewProduct;
