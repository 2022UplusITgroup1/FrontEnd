// 주문 페이지

import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import customAxios from "../../lib/customAxios";
import { Input, Button } from "@chakra-ui/react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import validation from "../../utils/validation";

function Order() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const onNameChange = (e) => {
    if (validation("string", e.target.value)) {
      setName(e.target.value);
    } else {
      alert("이름을 입력하세요");
    }
  };
  const onNumberChange = (e) => {
    if (validation("phoneNumber", e.target.value)) {
      setNumber(e.target.value);
    } else {
      alert("휴대폰 번호를 입력하세요");
    }
  };
  const onEmailChange = (e) => {
    if (validation("email", e.target.value)) {
      setEmail(e.target.value);
    } else {
      alert("이메일 주소를 입력하세요");
    }
  };
  const onAddressChange = (e) => {
    if (validation("string", e.target.value)) {
      setAddress(e.target.value);
    } else {
      alert("주소를 입력하세요");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, number, email, address);
  };

  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  return (
    <div className={styles.Container}>
      <div className={styles.OrderInfo}>
        <div className={styles.OrderInfoTitle}>가입자 정보</div>
        <form className={styles.UserInfo} onSubmit={onSubmit}>
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
            이메일 주소
            <Input
              variant="flushed"
              id="inputEmail"
              type="text"
              value={email}
              onChange={onEmailChange}
            />
          </label>
          <label htmlFor="inputAddress" className={styles.Input}>
            주소
            <Input
              variant="flushed"
              id="inputAddress"
              type="text"
              value={address}
              onChange={onAddressChange}
            />
          </label>
          <div className={styles.OrderBtnContainer}>
            <Link to="/mobile/order-result">
              <Button className={styles.OrderBtn} type="submit">
                주문하기
              </Button>
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.ProductInfo}>
        <OrderDetail product={orderProduct} />
      </div>
    </div>
  );
}

export default Order;
