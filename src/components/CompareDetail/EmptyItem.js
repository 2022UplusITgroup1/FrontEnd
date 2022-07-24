// 비교하기 상세 모달

import React, { useState, useEffect } from "react";
import styles from "./CompareDetail.module.css";
import { Link } from "react-router-dom";
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
const PRODUCTS_API_URL = `http://43.200.122.174:8000/product/phone?net_sp=`;

function EmptyItem() {
  const [brandType, setBrandType] = useState("0");
  const [phoneType, setPhoneType] = useState("0");
  const [products, setProducts] = useState([]);

  // GET 상품 전체 리스트
  const getProducts = async (netType) => {
    try {
      const response = await axios.get(`${PRODUCTS_API_URL}${netType}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("getProducts SUCCESS ");
        // color 가 다른 기종은 맨 처음 값만 가져오도록
        const res = response.data.data;
        let filteredRes = res.filter((item, i) => {
          return (
            res.findIndex((item2, j) => {
              return item.code === item2.code;
            }) === i
          );
        });
        return filteredRes;
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 5G, 4G 상품 모두 가져오기
    const promises = ["5G", "4G"].map((c) => {
      return getProducts(c);
    });
    Promise.all(promises).then((res) => setProducts(res));
  }, [brandType]);

  const onClickAddBtn = () => {};

  return (
    <div>
      <Box className={styles.ProductInfoBox}>
        <div className={styles.ProductInfoContainer}>
          {/* 제조사 */}
          <Select
            className={styles.PayPeriod}
            value={brandType}
            onChange={setBrandType}
            variant="flushed"
            placeholder="제조사"
          >
            <option value="1">삼성</option>
            <option value="2">애플</option>
          </Select>
          {/* 기기명 */}
          <Select
            className={styles.PayPeriod}
            value={phoneType}
            onChange={setPhoneType}
            variant="flushed"
            placeholder="기기명"
          >
            {products.map((p, i) => {
              return (
                <option key={i} value={p.code}>
                  {p.name}
                </option>
              );
            })}
          </Select>
        </div>

        <Button className={styles.ReadMoreBtn} onClick={onClickAddBtn}>
          추가하기
        </Button>
      </Box>
      {/* 빈 Box */}
      <div className={styles.DetailTitle}>
        <br />
      </div>
      <div className={styles.MonthPhonePrice}>
        {/* 월 납부금액 */}
        <Box className={styles.MonthPhonePriceBox}></Box>
      </div>
      <div className={styles.MonthPlanPrice}>
        {/* 통신료 */}
        <Box className={styles.MonthPlanPriceBox}></Box>
      </div>
      <div className={styles.DetailTitle}>
        <br />
      </div>
      <div className={styles.DiscountPlan}>
        {/* 할인유형, 요금제 */}
        <Box className={styles.DiscountPlanBox}>
          <div className={styles.DiscountPlanTxtContainer}></div>
        </Box>
      </div>
      <div className={styles.DetailTitle}>
        <br />
      </div>
      <div className={styles.Performance}>
        {/* 기기 성능 */}
        <Box className={styles.PerformanceBox}>
          <div className={styles.PerformanceTxtContainer}></div>
        </Box>
      </div>
    </div>
  );
}

export default EmptyItem;
