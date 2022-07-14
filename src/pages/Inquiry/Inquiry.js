import React, { useState } from "react";
import styles from "./Inquiry.module.css";
import { Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Inquiry() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const onNameChange = (e) => setName(e.target.value);
  const onNumberChange = (e) => setNumber(e.target.value);
  const onOrderNumChange = (e) => setOrderNum(e.target.value);
  return (
    <div className={styles.Container}>
      <div className={styles.OrderInfo}>
        <div className={styles.OrderInfoTitle}>주문 조회</div>
        <div className={styles.InputInfo}>
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
          <div className={styles.OrderBtnContainer}>
            <Link to="/inquiry-result">
              <Button className={styles.OrderBtn}>조회하기</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
