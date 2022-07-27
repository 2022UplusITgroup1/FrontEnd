// 주문 조회 결과 페이지

import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Image } from "@chakra-ui/react";
import SampleOrderData from "../../SampleOrderData.json";
import NoResult from "../Exception/NoResult";

const IMAGE_URI = `https://d2i7g6t0sifvpq.cloudfront.net`;

function Result() {
  const orderInfo = useSelector((state) => state.orderInquiryReducer);
  //console.log("orderInfo", orderInfo);

  const [orderData, setOrderData] = useState(orderInfo);
  const [name, setName] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [monthPrice, setMonthPrice] = useState("");
  const [phoneColor, setPhoneColor] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const [phoneName, setPhoneName] = useState("");
  const [planName, setPlanName] = useState("");

  useEffect(() => {
    console.log(orderData.productOrder.name);
    if (orderData.productOrder.name) {
      setName(orderData["productOrder"]["name"]);
      setOrderNum(orderData["productOrder"]["orderNumber"]);
      setPayPeriod(orderData["productOrder"]["payPeriod"]);
      setMonthPrice(orderData["productOrder"]["monthPrice"]);
      setPhoneCode(orderData["productOrder"]["phoneCode"]);
      setPhoneColor(orderData["productOrder"]["color"]);

      if (orderData["product"]) {
        setPhoneName(orderData["product"]["phone"]["name"]);
        setPlanName(orderData["product"]["plan"]["name"]);
      }
    }
  }, [orderData]);

  useEffect(() => {
    // getOrder();
    // setOrderData(SampleOrderData);
  }, []);

  //if (Object.keys(orderInfo).length === 0) return <NoResult />;
  if (!orderData.productOrder.name) return <NoResult />;

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
            <Image
              className={styles.ProductImg}
              src={`${IMAGE_URI}${orderData.phone.imgThumbnail}`}
              alt={orderData.phone.name}
            />
            <div className={styles.ContentTitle}>기기 정보</div>
            <div className={styles.Content}>
              {phoneName} {phoneColor}{" "}
            </div>
            <div className={styles.ContentTitle}>요금 정보</div>
            <div className={styles.Content}>{planName} </div>
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
