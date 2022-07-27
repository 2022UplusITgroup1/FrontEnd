import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ResultProduct.module.css";
import { Box, Image, Button } from "@chakra-ui/react";
import {
  deleteCompareProduct,
  setCompareModalIsOpen,
  setCompareProduct,
} from "../../actions";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";

const initialPrice = {
  discountName: "",
  phonePrice: 0,
  planPrice: 0,
  publicPrice: 0,
  selectPrice: 0,
  monthPhonePrice: 0,
  monthPlanPrice: 0,
  realPhonePrice: 0,
  total: 0,
};

const IMAGE_URI = `https://d2i7g6t0sifvpq.cloudfront.net`;

function ResultProduct({ product, plan }) {
  // if(plans)
  // console.log("plan",plan);

  const netType = product.networkSupport;
  // console.log("netType",netType);

  const dispatch = useDispatch();

  // 사용자가 선택한 옵션값
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer);
  //console.log(compares.items);

  // 이미 비교하기 리스트에 있는지 확인 => T/F
  const [isCompare, setIsCompare] = useState(
    compares.items.findIndex((item) => item.code === product.code) !== -1
  );

  // 상세 페이지로 넘길 URL
  const [detailURL, setDetailURL] = useState("");
  // 할인유형
  const [discountType, setDiscountType] = useState(
    product.discountType.toString()
  );

  // 요금제 계산
  // const [nowPrice, setNowPrice] = useState(initialPrice);
  let payPeriod = discountType === "3" ? 12 : 24;

  // console.log("before calc",product.price, plan.price, discountType, payPeriod);
  const nowPrice = calcPrices(
    product.price,
    plan.price,
    discountType.toString(),
    payPeriod
  );
  // console.log("monthPlanPrice",nowPrice.monthPlanPrice);
  // useEffect(() => {
  //   // 계약기간 => 기본 = 24, 선택약정12개월 = 12
  //   let payPeriod = discountType === "3" ? 12 : 24;
  //   if (product.code && plan.code) {
  //     console.log("product.code",product.code);
  //     const nowTotalPrice = calcPrices(
  //       product.price,
  //       plan.price,
  //       discountType,
  //       payPeriod
  //     );
  //     setNowPrice(nowTotalPrice);
  //   }
  // }, product);

  // console.log("nowPrice",nowPrice);

  useEffect(() => {
    // 상세 페이지로 넘어갈 URL 설정 (할인 유형이 추천 상태면 product 가 가진 값으로, 아니면 선택한 값으로)
    if (options.discountType === "0") {
      setDetailURL(
        `/mobile/detail/${netType}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
      );
      setDiscountType(product.discountType.toString());
    } else {
      setDetailURL(
        `/mobile/detail/${netType}/${plan.code}/${product.code}/${product.color}/${options.discountType}`
      );
      setDiscountType(options.discountType);
    }
  }, [product, options]);

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
              src={`${IMAGE_URI}${product.imgThumbnail}`}
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
        <Link to={detailURL} style={{ textDecoration: "none" }}>
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

export default ResultProduct;
