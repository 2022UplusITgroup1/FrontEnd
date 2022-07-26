// 비교하기 상세 모달

import React, { useState, useEffect } from "react";
import styles from "./CompareDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Box, Image } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import convertNumber from "../../utils/convertNumber";
import calcPrices from "../../utils/calcPrices";
import mapDiscountType from "../../utils/mapDiscountType";
import { deleteCompareDetailProduct } from "../../actions";
import calcInstallmentFee from "../../utils/calcInstallmentFee";

const COMPARE_URI = `/product/compare`;
const PRODUCTS_API_URI = `/product/phone?net_sp=`;

const initialPrice = {
  discountName: "",
  phonePrice: 0,
  planPrice: 0,
  publicPrice: 0,
  selectPrice: 0,
  monthPhonePrice: 0,
  monthPlanPrice: 0,
  realPhonePrice: 0,
  monthInstallmentFee: 0,
  totalInstallmentFee: 0,
  total: 0,
};
const IMAGE_URI = `${process.env.REACT_APP_IMAGE_URI}`;

function CompareItem({ index, item, payPeriod, discountType }) {
  //console.log(item);
  const dispatch = useDispatch();

  const onClickDeleteBtn = () => {
    // 비교하기 상품 삭제
    dispatch(
      deleteCompareDetailProduct(item.phone.code, item.plan.code, discountType)
    );
  };

  const [prices, setPrices] = useState(initialPrice);
  const [nowPayPeriod, setNowPayPeriod] = useState(payPeriod);

  const DETAIL_URI = `/mobile/detail/${item.phone.networkSupport}/${item.plan.code}/${item.phone.code}/${item.phone.color}/${discountType}`;

  // 데이터 에러 처리
  const [error, setError] = useState(null);

  const [colors, setColors] = useState([]);

  // API: 상품 색상 리스트 GET
  const fetchProductColor = async () => {
    const PRODUCT_COLOR_URI = `/product/color?ph_code=${item.phone.code}`;
    try {
      setError(null);
      const response = await axios.get(`${PRODUCT_COLOR_URI}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchProductColor SUCCESS ");
        // color 이름만 추출
        const color = response.data.data;
        setColors(color.map((c) => c.color));
        //console.log(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
      setError(e);
      return null;
    }
  };

  // 가격 계산 & 색상 리스트 저장
  useEffect(() => {
    if (item.phone.code) {
      const nowTotalPrice = calcPrices(
        item.phone.price,
        item.plan.price,
        discountType,
        Number(nowPayPeriod)
      );
      setPrices(nowTotalPrice);
      //console.log(nowTotalPrice);

      fetchProductColor();
    }
  }, [item, nowPayPeriod]);

  return (
    <div className={styles.CompareItemContainer}>
      <div className={styles.ProductInfo}>
        {/* 상품 소개 */}
        {prices && item.phone.code ? (
          <Box className={styles.ProductInfoBox}>
            <div className={styles.DeleteBtnContainer}>
              <button className={styles.DeleteBtn} onClick={onClickDeleteBtn}>
                ✕
              </button>
            </div>
            <div className={styles.ProductImgContainer}>
              <Image
                className={styles.ProductImg}
                src={`${IMAGE_URI}${item.phone.imgThumbnail}`}
                alt={item.phone.name}
              />
            </div>
            <div className={styles.ProductInfoTxt}>
              <div className={styles.ProductInfoName}>{item.phone.name}</div>
              <div className={styles.ProductInfoPrice}>
                월 {prices && convertNumber(prices.total)}원
              </div>
            </div>
            <Link to={DETAIL_URI}>
              <Button className={styles.ReadMoreBtn}>자세히보기</Button>
            </Link>
          </Box>
        ) : null}
      </div>
      {index === 0 ? (
        <div className={styles.DetailTitle}>월 납부금액</div>
      ) : (
        <div className={styles.DetailTitle}>
          <br />
        </div>
      )}
      <div className={styles.MonthPhonePrice}>
        {/* 월 납부금액 */}
        {prices && item.phone.code ? (
          <Box className={styles.MonthPhonePriceBox}>
            <div className={styles.MonthPhonePriceTxtContainer}>
              <dl className={styles.PriceDetail}>
                <div className={styles.PriceDetailMain}>
                  <dt className={styles.PriceDetailDTMain}>휴대폰 가격</dt>
                  {nowPayPeriod === "1" ? (
                    <dd className={styles.PriceDetailDDMain}>
                      {convertNumber(prices.phonePrice)}원
                    </dd>
                  ) : (
                    <dd className={styles.PriceDetailDDMain}>
                      월 {convertNumber(prices.monthPhonePrice)}원
                    </dd>
                  )}
                </div>
                <dt className={styles.PriceDetailDT}>출고가</dt>
                <dd className={styles.PriceDetailDD}>
                  {convertNumber(prices.phonePrice)}원
                </dd>
                <dt className={styles.PriceDetailDT}>공시지원금</dt>
                <dd className={styles.PriceDetailDD}>
                  {convertNumber(prices.publicPrice)}원
                </dd>
                <dt className={styles.PriceDetailDT}>할부수수료(연5.9%)</dt>
                <dd className={styles.PriceDetailDD}>
                  {nowPayPeriod >= 12
                    ? convertNumber(prices.totalInstallmentFee)
                    : 0}
                  원
                </dd>
                <dt className={styles.PriceDetailDT}>실구매가</dt>
                <dd className={styles.PriceDetailDD}>
                  {convertNumber(prices.realPhonePrice)}원
                </dd>
              </dl>
            </div>
          </Box>
        ) : null}
      </div>
      <div className={styles.MonthPlanPrice}>
        {/* 통신료 */}
        {prices && item.phone.code ? (
          <Box className={styles.MonthPlanPriceBox}>
            <div className={styles.MonthPlanPriceTxtContainer}>
              <dl className={styles.PriceDetail}>
                <div className={styles.PriceDetailMain}>
                  <dt className={styles.PriceDetailDTMain}>통신료</dt>
                  <dd className={styles.PriceDetailDDMain}>
                    월 {convertNumber(prices.monthPlanPrice)}원
                  </dd>
                </div>
                <dt className={styles.PriceDetailDT}>월정액</dt>
                <dd className={styles.PriceDetailDD}>
                  {convertNumber(prices.planPrice)}원
                </dd>
                <dt className={styles.PriceDetailDT}>선택약정할인</dt>
                <dd className={styles.PriceDetailDD}>
                  {convertNumber(prices.selectPrice)}원
                </dd>
              </dl>
            </div>
          </Box>
        ) : null}
      </div>
      {index === 0 ? (
        <div className={styles.DetailTitle}>할인유형, 요금제</div>
      ) : (
        <div className={styles.DetailTitle}>
          <br />
        </div>
      )}
      <div className={styles.DiscountPlan}>
        {/* 할인유형, 요금제 */}
        {prices && item.phone.code ? (
          <Box className={styles.DiscountPlanBox}>
            <div className={styles.DiscountPlanTxtContainer}>
              <div className={styles.DiscountPlanItem}>
                <Select
                  className={styles.PayPeriod}
                  value="1"
                  variant="flushed"
                >
                  <option value="1">신규가입</option>
                </Select>
              </div>
              <div className={styles.DiscountPlanItem}>
                <Select
                  className={styles.PayPeriod}
                  value={nowPayPeriod}
                  onChange={(e) => setNowPayPeriod(e.target.value)}
                  variant="flushed"
                >
                  <option value="1">완납결제</option>
                  <option value="12">12개월</option>
                  <option value="24">24개월</option>
                  <option value="36">36개월</option>
                </Select>
              </div>
              <div className={styles.DiscountPlanItem}>
                <Select
                  className={styles.PayPeriod}
                  value="1"
                  variant="flushed"
                  isReadOnly={true}
                >
                  <option value="1">{mapDiscountType(discountType)}</option>
                </Select>
              </div>
              <div className={styles.DiscountPlanItem}>
                <Select
                  className={styles.PayPeriod}
                  value="1"
                  variant="flushed"
                  isReadOnly={true}
                >
                  <option value="1">{item.plan.name}</option>
                </Select>
              </div>
            </div>
          </Box>
        ) : null}
      </div>
      {index === 0 ? (
        <div className={styles.DetailTitle}>기기 성능</div>
      ) : (
        <div className={styles.DetailTitle}>
          <br />
        </div>
      )}
      <div className={styles.Performance}>
        {/* 기기 성능 */}
        {prices && item.phone.code ? (
          <Box className={styles.PerformanceBox}>
            <div className={styles.PerformanceTxtContainer}>
              <div className={styles.PerformanceItemContainer}>
                <div className={styles.PerformanceTitle}>색상</div>
                {<div>{colors.join(", ")}</div>}
              </div>
              <div className={styles.PerformanceItemContainer}>
                <div className={styles.PerformanceTitle}>용량</div>
                <div>{item.phone.storage.capability}GB</div>
              </div>
            </div>
          </Box>
        ) : null}
      </div>
    </div>
  );
}

export default CompareItem;
