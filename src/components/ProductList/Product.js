// 상품 리스트 페이지 내 상품 Box

import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";

function Product({ product, plan, category }) {
  //console.log(product);
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const [detailURL, setDetailURL] = useState("");
  const [discountType, setDiscountType] = useState(
    product.discountType.toString()
  );

  let prices = calcMonthPrice(product.price, plan.price);
  let nowPrice = calcDiscountPrice(discountType.toString(), prices);

  //const [nowPrice, setNowPrice] = useState(0);

  /*
  const calculatePrice = (dcType) => {
    console.log(dcType);
    let calcPrices = calcMonthPrice(product.price, plan.price);
    //console.log(calcPrices);
    let calcNowPrice = calcDiscountPrice(dcType, calcPrices);
    console.log(product.name, calcNowPrice);
    setNowPrice(calcNowPrice);
  };
  */

  // !!! nowPrice useEffect 적용
  //const prices = calcMonthPrice(product.price, plan.price);
  //const nowPrice = calcDiscountPrice(discountType.toString(), prices);

  useEffect(() => {
    //console.log("product rendering");
    //console.log(options.discountType);
    // 상세 페이지로 넘어갈 URL 설정 (할인 유형이 추천 상태면 product 가 가진 값으로, 아니면 선택한 값으로)
    if (options.discountType === "0") {
      setDetailURL(
        `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
      );
      setDiscountType(product.discountType.toString());
      //calculatePrice(product.discountType.toString());
    } else {
      setDetailURL(
        `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${options.discountType}`
      );
      setDiscountType(options.discountType);
      //calculatePrice(options.discountType);
    }
  }, [product, options]);

  if (!product) return null;
  if (!plan) return null;

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
            <div className={styles.ProductDiscountType}>
              {nowPrice && nowPrice.name}
            </div>
          </Box>
        </Box>
      </Link>

      <Box className={styles.BoxBottom} p="6">
        <Link to={detailURL} style={{ textDecoration: "none" }}>
          <Box className={styles.Price}>
            <Box className={styles.PriceTxt}>
              휴대폰 월 {nowPrice && convertNumber(nowPrice.phone)}원
              {/*휴대폰 월 {convertNumber(nowPrice.phone)}원 */}
              {discountType === "1" && (
                <span className={styles.Discount}> (30% ↓)</span>
              )}
            </Box>
            <Box className={styles.PriceTxt}>
              통신료 월 {nowPrice && convertNumber(nowPrice.plan)}원
              {/*통신료 월 {convertNumber(nowPrice.plan)}원 */}
              {(discountType === "2" || discountType === "3") && (
                <span className={styles.Discount}> (25% ↓)</span>
              )}
            </Box>
            <Box className={styles.MonthPrice}>
              월 {nowPrice && convertNumber(nowPrice.total)}원
              {/*월 {convertNumber(nowPrice.total)}원 */}
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
