// 상품 리스트 페이지 내 상품 Box

import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Image, Button, useDisclosure } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import Compare from "../Compare/Compare";
import { setCompareIsOpen, setCompareProduct } from "../../actions";

function Product({ product, plan, category }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 사용자가 선택한 옵션값
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer);
  //console.log(compares.items);

  // 상세 페이지로 넘길 URL
  const [detailURL, setDetailURL] = useState("");
  // 할인유형
  const [discountType, setDiscountType] = useState(
    product.discountType.toString()
  );

  // 요금제 계산
  let prices = calcMonthPrice(product.price, plan.price);
  let nowPrice = calcDiscountPrice(discountType.toString(), prices);

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
    saveCompareProduct(); // 여기서 추가되므로
    if (compares.items.length > -1 && compares.items.length < 3) {
      dispatch(setCompareIsOpen(true));
      onOpen();
    } else {
      dispatch(setCompareIsOpen(false));
    }
  };

  /*
  useEffect(() => {
    //console.log(compares.items, compares.items.length);
    if (compares.items.length > 0 && compares.items.length <= 3) {
      onOpen();
    }
  }, [compares]);
  */

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
    <>
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
                {discountType === "1" && (
                  <span className={styles.Discount}> (30% ↓)</span>
                )}
              </Box>
              <Box className={styles.PriceTxt}>
                통신료 월 {nowPrice && convertNumber(nowPrice.plan)}원
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
              onClick={onClickCompareBtn}
            >
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
      {/* <Compare isOpen={isOpen} onClose={onClose} className={styles.Compare} /> */}
    </>
  );
}

export default Product;
