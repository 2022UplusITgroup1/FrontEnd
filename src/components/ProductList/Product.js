import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import { useSelector } from "react-redux";

function Product({ product, plans, category }) {
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);
  const [detailURL, setDetailURL] = useState("");
  const [discountValue, setDiscountValue] = useState(product.discountType);

  let plan = [];
  if (options.planValue === "0") {
    plan = plans[0];
  } else {
    plan = plans.find((p) => p.code === options.planValue);
  }

  useEffect(() => {
    if (options.discountValue !== "0") {
      setDiscountValue(options.discountValue);
    } else {
      setDiscountValue(product.discountType);
    }
  }, [options]);

  const prices = calcMonthPrice(product.price, plan.price);
  const nowPrice = calcDiscountPrice(discountValue.toString(), prices);
  //console.log(nowPrice);

  useEffect(() => {
    setDetailURL(
      `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
    );
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
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {convertNumber(nowPrice.plan)}원
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
          <Button className={styles.CompareBtn} borderRadius="50px">
            비교하기
          </Button>
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
