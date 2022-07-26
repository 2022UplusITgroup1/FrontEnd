// 주문 조회 결과 페이지

import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const SERVER_URI = `${process.env.REACT_APP_SERVER_URI}`;
const PLAN_API_URI = `/order/my?`;

function Result() {
  const [data, setData] = useState([]);

  // 주문 조회 값 가져오기
  const orderInfo = useSelector((state) => state.orderInquiryReducer);
  //console.log(orderInfo);

  // API 통신
  const getOrder = async () => {
    try {
      const response = await axios.get(`${SERVER_URI}${PLAN_API_URI}`);
      //console.log(response.data);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.ResultInfo}>
        <div className={styles.ResultInfoTitle}>주문 조회</div>
        <div className={styles.ResultInfoContent}>
          <div className={styles.UserInfo}>
            <div className={styles.Title}>이름</div>
            <div className={styles.Content}>{data.name}</div>
          </div>
          <div className={styles.OrderInfo}>
            <div className={styles.Title}>상품 정보</div>
            <div className={styles.ContentTitle}>{data.phoneCode}</div>
            <div className={styles.Content}>{data.planCode}</div>
            <div className={styles.Content}>{data.color}</div>
            <div className={styles.Content}>{data.monthPrice} 원</div>
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
