// 비교하기 상세 모달

import React, { useState, useEffect } from "react";
import styles from "./CompareDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import SampleCompareData from "../../SampleCompareData.json";
import calcPrices from "../../utils/calcPrices";
import mapDiscountType from "../../utils/mapDiscountType";

const COMPARE_URL = `http://43.200.122.174:8000/product/compare`;

function CompareDetail({ isOpen, onClose }) {
  // 현재 선택된 비교하기 상품들 가져오기
  const compareItems = useSelector((state) => state.compareReducer).items;
  console.log(compareItems);

  // 비교하기 아이템 리스트
  const [data, setData] = useState(compareItems);
  const [compareData, setCompareData] = useState([]);
  const [payPeriods, setPayPeriods] = useState([24, 24, 24]);
  const [prices, setPrices] = useState([]);
  const [discountTypes, setDiscountTypes] = useState([]);
  const [colors, setColors] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API: 비교하기 결과 POST
  const fetchCompareData = async () => {
    let requestBody = [];
    compareItems.map((d) =>
      requestBody.push({
        code: d.code,
        networkSupport: d.networkSupport,
        discountType: d.discountType,
        color: d.color,
        plan: d.plan,
      })
    );

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${COMPARE_URL}`, requestBody);

      if (response.data.data !== null) {
        console.log("fetchCompareData SUCCESS ");
        // color 가 다른 기종은 처음 값으로 처리
        setCompareData(response.data.data);
        console.log(response.data.data);
      }
    } catch (e) {
      //console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // API: 상품 색상 리스트 GET
  const fetchProductColor = async (phCode) => {
    const PRODUCT_COLOR_URL = `http://43.200.122.174:8000/product/color?ph_code=${phCode}`;
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PRODUCT_COLOR_URL}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchProductColor SUCCESS ");
        //setColors(response.data.data);
        return response.data.data;
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
      setError(e);
      return null;
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (compareItems.length) setData(compareItems);
  // }, [compareItems]);

  useEffect(() => {
    if (compareItems.length) {
      fetchCompareData();
      //setCompareData(SampleCompareData);
      // 상세 조회 당시의 할인유형 값
      let dcTypes = [];
      compareItems.map((d) => dcTypes.push(d.discountType));
      setDiscountTypes(dcTypes);
    }
  }, [compareItems]);

  useEffect(() => {
    console.log(compareData);
    if (compareData.length) {
      let nowPrices = [];
      compareData.map((c, i) => {
        const nowTotalPrice = calcPrices(
          c.phone.price,
          c.plan.price,
          discountTypes[i],
          payPeriods[i]
        );
        nowPrices.push(nowTotalPrice);
        console.log(nowTotalPrice);
      });
      console.log(nowPrices);
      setPrices(nowPrices);

      // 상품 별 컬러 가져오기
      const promises = compareData.map((c) => {
        return fetchProductColor(c.phone.code);
      });
      Promise.all(promises).then((res) => setColors(res));
    }
  }, [compareData]);

  if (!compareItems.length) return null;
  if (!compareData.length) return null;

  return (
    <Modal
      className={styles.Modal}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className={styles.ModalContent}>
        <ModalHeader className={styles.ModalHeader}>비교결과</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.ModalBody}>
          <div className={styles.ProductInfo}>
            {/* 상품 소개 */}
            {prices.length &&
              compareData.length &&
              compareData.map((d, i) => {
                const nowTotalPrice = calcPrices(
                  d.phone.price,
                  d.plan.price,
                  compareItems[i].discountType,
                  payPeriods[i]
                );
                console.log(nowTotalPrice);
                const DETAIL_URL = `/mobile/detail/${d.networkSupport}/${d.plan.code}/${d.phone.code}/${d.phone.color}/${compareItems[i].discountType}`;
                return (
                  <Box key={i} className={styles.ProductInfoBox}>
                    <div className={styles.ProductImgContainer}>
                      <Image
                        className={styles.ProductImg}
                        src={d.phone.imgThumbnail}
                        alt={d.phone.name}
                      />
                    </div>
                    <div className={styles.ProductInfoTxt}>
                      <div>{d.phone.name}</div>
                      <div>월 {convertNumber(prices[i].total)}원</div>
                    </div>
                    <Link to={DETAIL_URL}>
                      <Button className={styles.ReadMoreBtn}>자세히보기</Button>
                    </Link>
                  </Box>
                );
              })}
          </div>
          <div>월 납부금액</div>
          <div className={styles.MonthPhonePrice}>
            {/* 월 납부금액 */}
            {prices.length &&
              compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPhonePriceBox}>
                    <div className={styles.MonthPhonePriceTxtContainer}>
                      <div>
                        휴대폰 가격 {convertNumber(prices[i].monthPhonePrice)}
                      </div>
                      <div>출고가 {convertNumber(prices[i].phonePrice)}</div>
                      <div>
                        공시지원금 {convertNumber(prices[i].publicPrice)}
                      </div>
                      <div>
                        실구매가 {convertNumber(prices[i].realPhonePrice)}
                      </div>
                    </div>
                  </Box>
                );
              })}
          </div>
          <div className={styles.MonthPlanPrice}>
            {/* 통신료 */}
            {prices.length &&
              compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPlanPriceBox}>
                    <div className={styles.MonthPlanPriceTxtContainer}>
                      <div>
                        통신료 {convertNumber(prices[i].monthPlanPrice)}
                      </div>
                      <div>월정액 {convertNumber(prices[i].planPrice)}</div>
                      <div>
                        선택약정할인 {convertNumber(prices[i].selectPrice)}
                      </div>
                    </div>
                  </Box>
                );
              })}
          </div>
          <div>할인유형, 요금제</div>
          <div className={styles.DiscountPlan}>
            {/* 할인유형, 요금제 */}
            {discountTypes.length &&
              compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.DiscountPlanBox}>
                    <div className={styles.DiscountPlanTxtContainer}>
                      <div>신규가입</div>
                      <div>할부개월 {/* select */}</div>
                      <div>{mapDiscountType(discountTypes[i])}</div>
                      <div>{d.plan.name}</div>
                    </div>
                  </Box>
                );
              })}
          </div>
          <div>기기 성능</div>
          <div className={styles.DiscountPlan}>
            {/* 기기 성능 */}
            {discountTypes.length &&
              compareData.length &&
              compareData.map((d, i) => {
                console.log(colors);
                if (colors.length) {
                  const nowColors = [];
                  colors[i].map((c, i) => nowColors.push(c.color));
                  console.log(nowColors);
                  return (
                    <Box key={i} className={styles.DiscountPlanBox}>
                      <div className={styles.DiscountPlanTxtContainer}>
                        <div>색상</div>
                        {<div>{nowColors.join(",")}</div>}
                        <div>용량</div>
                        <div>{d.phone.storage.capability}GB</div>
                      </div>
                    </Box>
                  );
                }
              })}
          </div>
        </ModalBody>
        <ModalFooter className={styles.ModalFooter}>
          <div className={styles.FooterBtnContainer}>
            <Button onClick={onClose} className={styles.FooterCancelBtn}>
              확인
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CompareDetail;
