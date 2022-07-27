// 주문 페이지

import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import customAxios from "../../lib/customAxios";
import { Input, Button } from "@chakra-ui/react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import validateOrder from "../../utils/validateOrder";
import ErrorPage from "../Exception/ErrorPage";
import customPostAxios from "../../lib/customPostAxios";

const PLAN_API_URL = `/order/payment`;

function Order() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // API 통신
  const postOrder = async () => {
    // const req = {
    //   name: name,
    //   email: email,
    //   address: address,
    //   phoneNumber: number,
    //   discountType: orderProduct.discountType,
    //   monthPrice: ,
    //   payPeriod,
    //   phone:
    // }
    // try {
    //   const response = await customPostAxios.post(`${PLAN_API_URL}`);
    //   //console.log(response.data);
    //   //setProduct(response.data);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  useEffect(() => {
    //getOrder();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateOrder({ name, number, email, address })) {
      history.push("/mobile/order-result");
    } else {
      alert("주문 정보가 잘못되었습니다");
    }
    //console.log(name, number, email, address);
  };

  if (!orderProduct.phone.code) {
    return <ErrorPage />;
  }

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
            <Button className={styles.OrderBtn} type="submit">
              주문하기
            </Button>
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
