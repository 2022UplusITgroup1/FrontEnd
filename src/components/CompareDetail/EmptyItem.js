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
import mapBrandName from "../../utils/mapBrandName";
import { addCompareDetailProduct } from "../../actions";

const COMPARE_URL = `/product/compare`;
const PRODUCTS_API_URL = `/product/phone?net_sp=`;

function EmptyItem({ products }) {
  const dispatch = useDispatch();
  const [brandType, setBrandType] = useState("0");
  const [phoneType, setPhoneType] = useState("0");
  const [phoneList, setPhoneList] = useState([]);

  // 삼성 / 애플 기종으로 filtering
  useEffect(() => {
    const filtered = products.filter(
      (p) => p.brand.name === mapBrandName(brandType)
    );
    //console.log(filtered);
    setPhoneList(filtered);
  }, [brandType]);

  const onChangeBrandType = (e) => {
    //console.log(e.target.value);
    setBrandType(e.target.value);
  };

  const onChangePhoneType = (e) => {
    //console.log(e.target.value);
    setPhoneType(e.target.value);
  };

  // Action 으로 비교하기 상세 리스트에 추가
  const onClickAddBtn = () => {
    const findPhone = products.filter((p) => p.code === phoneType)[0];
    const detailInfo = {
      code: findPhone.code,
      name: findPhone.name,
      color: findPhone.color,
      imgThumbnail: findPhone.imgThumbnail,
      plan: findPhone.planCode,
      networkSupport: findPhone.networkSupport,
      discountType: findPhone.discountType.toString(),
      totalPrice: findPhone.price,
    };
    //console.log(detailInfo);
    dispatch(addCompareDetailProduct(detailInfo));
  };

  return (
    <div>
      <Box className={styles.ProductSelectBox}>
        <div className={styles.ProductSelectContainer}>
          {/* 제조사 */}
          <div className={styles.BrandTypeSelect}>
            <Select
              className={styles.BrandType}
              value={brandType}
              onChange={onChangeBrandType}
              variant="flushed"
              placeholder="제조사"
            >
              <option value="1">삼성</option>
              <option value="2">애플</option>
            </Select>
          </div>
          {/* 기기명 */}
          <div className={styles.PhoneTypeSelect}>
            <Select
              className={styles.PhoneType}
              value={phoneType}
              onChange={onChangePhoneType}
              variant="flushed"
              placeholder="기기명"
            >
              {phoneList.map((p, i) => {
                return (
                  <option key={i} value={p.code}>
                    {p.name}
                  </option>
                );
              })}
            </Select>
          </div>
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
