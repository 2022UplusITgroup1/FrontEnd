import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Result.module.css";
import { Button } from "@chakra-ui/react";

const PLAN_API_URL = `${process.env.REACT_APP_ORDER_INQUIRY_SERVER_URL}/order/my?name=%EC%95%84%EC%9D%B4%EC%9C%A0&phone_number=01012340001&order_number=202207132210570001`;

function Result() {
  const [data, setData] = useState([]);

  // API 통신
  const getOrder = async () => {
    try {
      const response = await axios.get(`${PLAN_API_URL}`);
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
            <div className={styles.Content}>월 {data.monthPrice} 원</div>
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
