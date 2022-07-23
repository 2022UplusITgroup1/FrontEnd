import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions } from "../../actions";
import { RadioGroup, Radio, useDisclosure } from "@chakra-ui/react";

function PayPeriodDetail({ payPeriod, setPayPeriod }) {
  return (
    <>
      <div className={styles.PayPeriodContainer}>
        <button
          className={styles.PayPeriod}
          onClick={(e) => setPayPeriod(1)}
          style={{
            borderColor: payPeriod === 1 ? "#000" : "#ddd",
            color: payPeriod === 1 ? "#000" : "#666",
          }}
        >
          카드/간편결제
          <div>(일시불/할부)</div>
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => setPayPeriod(12)}
          style={{
            borderColor: payPeriod === 12 ? "#000" : "#ddd",
            color: payPeriod === 12 ? "#000" : "#666",
          }}
        >
          12개월
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => setPayPeriod(24)}
          style={{
            borderColor: payPeriod === 24 ? "#000" : "#ddd",
            color: payPeriod === 24 ? "#000" : "#666",
          }}
        >
          24개월
        </button>
        <button
          className={styles.PayPeriod}
          onClick={(e) => setPayPeriod(36)}
          style={{
            borderColor: payPeriod === 36 ? "#000" : "#ddd",
            color: payPeriod === 36 ? "#000" : "#666",
          }}
        >
          36개월
        </button>
      </div>
    </>
  );
}

export default PayPeriodDetail;
