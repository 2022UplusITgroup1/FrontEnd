// 주문 조회 페이지

import React, { useEffect, useState } from "react";
import styles from "./Inquiry.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";
import { resetOrderInquiryInfo, setOrderInquiryInfo } from "../../actions";

const INQUIRY_REQUEST_URL = `http://localhost:8000/order/my`;

function Inquiry() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const onNameChange = (e) => setName(e.target.value);
  const onNumberChange = (e) => setNumber(e.target.value);
  const onOrderNumChange = (e) => setOrderNum(e.target.value);

  useEffect(() => {
    // 맨 처음 렌더링 -> 초기화
    dispatch(resetOrderInquiryInfo());
  }, []);

  useEffect(() => {
    // store 에 저장
    dispatch(
      setOrderInquiryInfo({
        name: name,
        phoneNumber: number,
        orderNumber: orderNum,
      })
    );
  }, [name, number, orderNum]);

  return (
    <div className={styles.Container}>
      <div className={styles.InquiryInfo}>
        <div className={styles.InquiryInfoTitle}>주문 조회</div>
        <div className={styles.InquiryInfoInput}>
          <label htmlFor="inputName" className={styles.Input}>
            이름
            <Input
              variant="flushed"
              id="inputName"
              type="text"
              value={name}
              onChange={onNameChange}
            />
          </label>
          <label htmlFor="inputNumber" className={styles.Input}>
            휴대폰 번호
            <Input
              variant="flushed"
              id="inputNumber"
              type="text"
              value={number}
              onChange={onNumberChange}
            />
          </label>
          <label htmlFor="inputEmail" className={styles.Input}>
            주문 번호
            <Input
              variant="flushed"
              id="inputEmail"
              type="text"
              value={orderNum}
              onChange={onOrderNumChange}
            />
          </label>
          <div className={styles.InquiryBtnContainer}>
            <Link to="/mobile/inquiry-result">
              <Button className={styles.InquiryBtn}>조회하기</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
