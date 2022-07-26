// 주문 조회 결과 페이지

import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import SampleOrderData from "../../SampleOrderData.json";
import NoResult from "../Exception/NoResult";

function Result() {
  const orderInfo = useSelector((state) => state.orderInquiryReducer);
  //console.log("orderInfo", orderInfo);

  const [orderData, setOrderData] = useState(orderInfo);
  const [name, setName] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [monthPrice, setMonthPrice] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  useEffect(() => {
    if (orderData.name) {
      setName(orderData["productOrder"]["name"]);
      setOrderNum(orderData["productOrder"]["orderNumber"]);
      setPayPeriod(orderData["productOrder"]["payPeriod"]);
      setMonthPrice(orderData["productOrder"]["monthPrice"]);
      setPhoneCode(orderData["productOrder"]["phoneCode"]);
    }
  }, [orderData]);

  useEffect(() => {
    setOrderData(SampleOrderData);
  }, []);

  if (!orderInfo.name) return <NoResult />;

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
            <div className={styles.ContentTitle}>기기 정보</div>
            <div className={styles.Content}>{phoneCode} </div>
            <div className={styles.ContentTitle}>요금 정보</div>
            <div className={styles.Content}>
              월 {monthPrice} 원 (할부기간 : {payPeriod} 개월)
            </div>
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
