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

const COMPARE_URL = `http://43.200.122.174:8000/compare`;

function CompareDetail({ isOpen, onClose }) {
  // 현재 선택된 비교하기 상품들 가져오기
  const compares = useSelector((state) => state.compareReducer).items;
  console.log(compares);

  const [data, setData] = useState(compares);
  const [compareData, setCompareData] = useState([]);
  const [payPeriods, setPayPeriods] = useState([12, 12, 12]);
  const [prices, setPrices] = useState([]);
  const [discountTypes, setDiscountTypes] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // useEffect(() => {
  //   if (compares.length) setData(compares);
  // }, [compares]);

  useEffect(() => {
    if (compares.length) {
      //fetchCompareData();
      setCompareData(SampleCompareData);
      // 상세 조회 당시의 할인유형 값
      let dcTypes = [];
      compares.map((d) =>
        dcTypes.push({
          discountType: d.discountType,
        })
      );
      setDiscountTypes(dcTypes);
    }
  }, [compares]);

  useEffect(() => {
    console.log(compareData);
    if (compareData.length) {
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
    }
  }, [compareData]);

  if (!compares.length) return null;
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
            {compares.length &&
              compareData.length &&
              compareData.map((d, i) => {
                console.log(d);
                const nowPlanPrice = calcMonthPrice(
                  d["phone"]["price"],
                  d["plan"]["price"]
                );
                console.log(compares);
                const nowTotalPrice = calcDiscountPrice(
                  compares[i].discountType,
                  nowPlanPrice
                );
                console.log(nowTotalPrice);
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
                      <div>월 {convertNumber(nowTotalPrice.total)}원</div>
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
            {/* {compareData.length &&
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
              })} */}
          </div>
          <div className={styles.MonthPlanPrice}>
            {/* 요금제 */}
            {/* {compareData.length &&
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
              })} */}
          </div>
          <div>할인유형, 요금제</div>
          <div className={styles.MonthPrice}>
            {/* 할인유형, 요금제 */}
            {/*compareData.length &&
              compareData.map((d, i) => {
                return (
                  <Box key={i} className={styles.MonthPriceBox}>
                    <div className={styles.MonthPriceTxtContainer}>
                      <div>신규가입</div>
                      <div>할부개월 {/* select로 payPeriod /}</div>
                      <div>
                        {mapDiscountType(d.phone.discountType) /* req dcType /}
                      </div>
                      <div>{d.plan.name}</div>
                    </div>
                  </Box>
                );
              })*/}
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
