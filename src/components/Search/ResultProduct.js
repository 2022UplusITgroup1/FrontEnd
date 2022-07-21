import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ResultProduct.module.css";
import { Box, Image, Button } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";

function Product({ product, plan, category }) {
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const [detailURL, setDetailURL] = useState("");
  const [discountValue, setDiscountValue] = useState(
    product.discountType.toString()
  );

  // !!! nowPrice useEffect 적용
  const prices = calcMonthPrice(product.price, plan.price);
  const nowPrice = calcDiscountPrice(discountValue.toString(), prices);

  useEffect(() => {
    if (options.discountValue === "0") {
      setDetailURL(
        `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
      );
      setDiscountValue(product.discountType.toString());
    } else {
      setDetailURL(
        `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${options.discountValue}`
      );
      setDiscountValue(options.discountValue);
    }
  }, [options]);

  return (
    <Box
      className={styles.Container}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Link to={detailURL} style={{ textDecoration: "none" }}>
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
        <Link to={detailURL} style={{ textDecoration: "none" }}>
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

        <Box
          className={styles.Button}
          display="flex"
          mt="2"
          alignItems="center"
        >
          
          <Link to={detailURL} style={{ textDecoration: "none" }}>
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
