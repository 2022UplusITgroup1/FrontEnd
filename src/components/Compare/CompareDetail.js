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
import mapDiscountType from "../../utils/mapDiscountType";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import floorNumber from "../../utils/floorNumber";
import SampleCompareData from "../../SampleCompareData.json";

const COMPARE_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/compare`;

function CompareDetail({ data, isOpen, onClose }) {
  console.log(data);
  const [compareData, setCompareData] = useState([]);
  const [payPeriods, setPayPeriods] = useState([12, 12, 12]);
  const [prices, setPrices] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 상세 조회 당시의 할인유형 값
  let discountTypes = [];
  data.map((d) =>
    discountTypes.push({
      discountType: d.discountType,
    })
  );

  // API: 비교하기 결과 POST
  const fetchCompareData = async () => {
    let requestBody = [];
    data.map((d) =>
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
      console.log("fetchCompareData SUCCESS ");
      setCompareData(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    //fetchCompareData();
    setCompareData(SampleCompareData);
  }, []);

  useEffect(() => {
    console.log(compareData);
    let nowPrices = [];
    compareData.map((c, i) => {
      const nowPlanPrice = calcMonthPrice(
        c["phone"]["price"],
        c["plan"]["price"],
        payPeriods[i]
      );
      const nowTotalPrice = calcDiscountPrice(discountTypes[i], nowPlanPrice);
      nowPrices.push(nowTotalPrice);
      console.log(nowTotalPrice);
    });
    console.log(nowPrices);
    setPrices(nowPrices);
  }, [compareData]);

  if (!data) return null;

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
            {compareData.length &&
              compareData.map((d, i) => {
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
                      <div>월 {prices && convertNumber(prices[i].total)}원</div>
                    </div>
                    <Button onClick={onClose} className={styles.ReadMoreBtn}>
                      자세히보기
                    </Button>
                  </Box>
                );
              })}
          </div>
          <div>월 납부금액</div>
          <div className={styles.MonthPhonePrice}>
            {/* 월 납부금액 */}
            {compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPhonePriceBox}>
                    <div className={styles.MonthPhonePriceTxtContainer}>
                      <div>휴대폰 가격 {convertNumber(d.phone.price)}</div>
                      <div>출고가 {convertNumber(prices[i].phone)}</div>
                      <div>공시지원금 {convertNumber(prices[i].phone)}</div>
                      <div>실구매가 {convertNumber(prices[i].phone)}</div>
                    </div>
                  </Box>
                );
              })}
          </div>
          <div className={styles.MonthPlanPrice}>
            {/* 요금제 */}
            {compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPlanPriceBox}>
                    <div className={styles.MonthPlanPriceTxtContainer}>
                      <div>통신료 {convertNumber(prices[i].phone)}</div>
                      <div>월정액 {convertNumber(prices[i].phone)}</div>
                      <div>선택약정할인 {convertNumber(prices[i].phone)}</div>
                    </div>
                  </Box>
                );
              })}
          </div>
          <div>할인유형, 요금제</div>
          <div className={styles.MonthPrice}>
            {/* 할인유형, 요금제 */}
            {compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPriceBox}>
                    <div className={styles.MonthPriceTxtContainer}>
                      <div>신규가입</div>
                      <div>할부개월 {/* select로 payPeriod */}</div>
                      <div>
                        {mapDiscountType(d.phone.discountType) /* req dcType */}
                      </div>
                      <div>{d.plan.name}</div>
                    </div>
                  </Box>
                );
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
