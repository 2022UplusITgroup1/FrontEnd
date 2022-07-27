// 주문 완료 페이지

import React, { useEffect, useState } from "react";
import styles from "./OrderResult.module.css";
import { FiCheckCircle } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function OrderResult() {
  const { orderNum } = useParams();
  const orderNumber = useSelector((state) => state.orderNumberReducer);

  console.log(orderNumber);

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

          <div className={styles.OrderNumber}>
            {" "}
            {orderNum && `주문번호:  ${orderNum}`}{" "}
          </div>
          <div className={styles.OrderResultTitle}>
            주문이 완료되었습니다.
            <br />
            감사합니다.
          </div>
        </div>
        <div className={styles.ResultBtnContainer}>
          <Link to="/">
            <button className={styles.ResultBtn}>확인</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderResult;
