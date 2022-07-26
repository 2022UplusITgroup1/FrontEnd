// 주문 조회 결과 페이지

import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SampleOrderData from "../../SampleOrderData.json";

const PLAN_API_URI = `/order/my?`;

function Result() {

  const orderInfo = useSelector((state) => state.orderInquiryReducer);
  console.log("orderInfo",orderInfo);

  const [orderData, setOrderData] = useState(orderInfo);
  const name=orderData["productOrder"]["name"];
  const orderNum=orderData["productOrder"]["orderNumber"];
  const payPeriod=orderData["productOrder"]["payPeriod"];
  const monthPrice=orderData["productOrder"]["monthPrice"];
  const phoneCode=orderData["productOrder"]["phoneCode"];
  // const phoneName=orderData["product"]["phone"]["name"];
  // const phoneColor=orderData["product"]["phone"]["color"];
  // const phoneThumbnail=orderData["product"]["phone"]["imgThumbnail"];
  // const planName=orderData["product"]["plan"]["name"];


  // 주문 조회 값 가져오기
  
  console.log("orderInfo",orderInfo);

  // API 통신
  // const getOrder = async () => {
  //   try {
  //     const response = await axios.get(`${PLAN_API_URL}`);
  //     //console.log(response.data);
  //     setOrderData(response.data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    // getOrder();
    setOrderData(SampleOrderData);


  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.ResultInfo}>
        <div className={styles.ResultInfoTitle}>주문 조회</div>
        <div className={styles.ResultInfoContent}>
          <div className={styles.UserInfo}>
            <div className={styles.ContentTitle}>주문자 이름</div>
            <div className={styles.Content}>{name}</div>
            <div className={styles.ContentTitle}>주문 번호</div>
            <div className={styles.Content}>{orderNum}</div>
          </div>
          <div className={styles.OrderInfo}>
            {/* <div className={styles.Title}>상품 정보</div> */}
            <div className={styles.ContentTitle}>기기 정보</div>
            <div className={styles.Content}>{phoneCode} </div>
            {/* <div className={styles.ContentTitle}>요금제 정보</div> */}
            {/* <div className={styles.Content}>{planName}</div> */}
            {/* <div className={styles.Content}>{phoneColor}</div> */}
            <div className={styles.ContentTitle}>요금 정보</div>
            <div className={styles.Content}>월 {monthPrice} 원 (할부기간 : {payPeriod} 개월)</div>
          </div>
        </div>
        <div className={styles.ResultBtnContainer}>
          <Link to="/">
            <Button className={styles.ResultBtn}>확인</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
