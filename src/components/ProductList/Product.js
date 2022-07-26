// 상품 리스트 페이지 내 상품 Box

import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image, Button } from "@chakra-ui/react";
import {
  deleteCompareProduct,
  setCompareModalIsOpen,
  setCompareProduct,
} from "../../actions";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";

// 결제 금액 초기화 값
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

function Product({ product, plan, netType }) {
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

  // 상세 페이지로 넘길 URI
  const [detailURI, setDetailURI] = useState("");
  // 할인유형
  const [discountType, setDiscountType] = useState(
    product.discountType.toString()
  );

  // 요금제 계산
  const [nowPrice, setNowPrice] = useState(initialPrice);

  useEffect(() => {
    // 계약기간 => 기본 = 24
    let payPeriod = 24;
    if (product.code && plan.code) {
      //console.log("product.code", product.code);
      const nowTotalPrice = calcPrices(
        product.price,
        plan.price,
        discountType,
        payPeriod
      );
      setNowPrice(nowTotalPrice);
    }
  }, [discountType, plan, product]);
  // options

  // Redux Dispatch -> 비교하기 정보 저장
  const saveCompareProduct = () => {
    const compareInfo = {
      code: product.code,
      name: product.name,
      color: product.color,
      imgThumbnail: product.imgThumbnail,
      plan: plan.code,
      networkSupport: product.networkSupport,
      discountType: discountType,
      totalPrice: nowPrice.total,
    };
    dispatch(setCompareProduct(compareInfo));
    //console.log(compares.items);
  };

  // 비교하기 버튼 이벤트
  const onClickCompareBtn = () => {
    //console.log(isCompare);
    // 이미 비교하기 상품인 경우 -> 삭제
    if (isCompare === true) {
      // 비교하기 상품 삭제
      dispatch(deleteCompareProduct(product.code));
      setIsCompare(!isCompare);
    } else {
      // 비교하기 상품 추가
      // 개수 제한 (추가할 수 있는 경우 => length === 0 ~ 2)
      if (compares.items.length > -1 && compares.items.length < 3) {
        setIsCompare(!isCompare);
        saveCompareProduct();
        dispatch(setCompareModalIsOpen(true));
      } else {
        alert("최대 3개 상품까지 비교하기가 가능합니다.");
      }
    }
  };

  // 비교하기 창에서 삭제 시, 상품에도 반영 (버튼 색깔 변경)
  useEffect(() => {
    const isInCompare = compares.items.find(
      (item) => item.code === product.code
    );
    if (!isInCompare) setIsCompare(false);
  }, [compares.items]);

  useEffect(() => {
    // 상세 페이지로 넘어갈 URI 설정 (할인 유형이 추천 상태면 product 가 가진 값으로, 아니면 선택한 값으로)
    if (options.discountType === "0") {
      setDetailURI(
        `/mobile/detail/${netType}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
      );
      setDiscountType(product.discountType.toString());
    } else {
      setDetailURI(
        `/mobile/detail/${netType}/${plan.code}/${product.code}/${product.color}/${options.discountType}`
      );
      setDiscountType(options.discountType);
    }
  }, [product, options]);

  if (!product) return null;
  if (!plan) return null;

  return (
    <>
      <Box
        className={styles.Container}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Link to={detailURI} style={{ textDecoration: "none" }}>
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
                {nowPrice && nowPrice.discountName}
              </div>
            </Box>
          </Box>
        </Link>

        <Box className={styles.BoxBottom} p="6">
          <Link to={detailURI} style={{ textDecoration: "none" }}>
            <Box className={styles.Price}>
              {/* <Box className={styles.PriceTxt}>
                MonPrice 월 {nowPrice && convertNumber(product.monPrice)}원
              </Box> */}
              {/* <Box className={styles.PriceTxt}>
                정상가 {nowPrice && convertNumber(nowPrice.phonePrice)}원
              </Box> */}
              <Box className={styles.PriceTxt}>
                휴대폰 월 {nowPrice && convertNumber(nowPrice.monthPhonePrice)}
                원
                {discountType === "1" && (
                  <span className={styles.Discount}> (30% ↓)</span>
                )}
              </Box>
              <Box className={styles.PriceTxt}>
                통신료 월 {nowPrice && convertNumber(nowPrice.monthPlanPrice)}원
                {(discountType === "2" || discountType === "3") && (
                  <span className={styles.Discount}> (25% ↓)</span>
                )}
              </Box>
              <Box className={styles.MonthPrice}>
                월 {nowPrice && convertNumber(nowPrice.total)}원
              </Box>
            </Box>
          </Link>

          <Box
            className={styles.Button}
            display="flex"
            mt="2"
            alignItems="center"
          >
            <Button
              className={styles.CompareBtn}
              borderRadius="50px"
              border="1px solid"
              onClick={onClickCompareBtn}
              style={{
                backgroundColor: isCompare ? "black" : "white",
                color: isCompare ? "white" : "black",
              }}
            >
              비교하기
            </Button>
            <Link to={detailURI} style={{ textDecoration: "none" }}>
              <Button
                className={styles.OrderBtn}
                borderRadius="50px"
                border="1px solid"
                style={{ backgroundColor: "white" }}
              >
                주문하기
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Product;
