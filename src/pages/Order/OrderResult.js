// 주문 완료 페이지

import React, { useEffect, useState } from "react";
import styles from "./OrderResult.module.css";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function OrderResult() {
  const orderData = useSelector((state) => state.orderReducer);

  const [orderNumber, setOrderNumber] = useState(orderData.data);

  useEffect(() => {
    // console.log(status,orderData.status);
    console.log(orderData.data);
    if (orderData.data) {

      setOrderNumber(orderData.data);
    }
  }, [orderNumber]);

  return (
    <div className={styles.Container}>
      <div className={styles.OrderResultContatiner}>
        <div className={styles.OrderResult}>
          <div className={styles.OrderResultCheck}>
            <FiCheckCircle
              size="50"
              color="green"
              className={styles.OrderResultCheckIcon}
            />
          </div>
          <div className={styles.Content}>주문번호 {orderNumber} </div>
          <div className={styles.OrderResultTitle}>
            주문이 완료되었습니다.
            <br />
            감사합니다.
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

export default OrderResult;
