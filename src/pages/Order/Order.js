// 주문 페이지

import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Input, Button } from "@chakra-ui/react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";

const PLAN_API_URI = `${process.env.REACT_APP_ORDER_SERVER_URI}/order/my?name=%EC%95%84%EC%9D%B4%EC%9C%A0&phone_number=01012340001&order_number=202207132210570001`;

function Order() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const onNameChange = (e) => setName(e.target.value);
  const onNumberChange = (e) => setNumber(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onAddressChange = (e) => setAddress(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, number, email, address);
  };

  const orderProduct = useSelector((state) => state.orderReducer);
  console.log(orderProduct);

  // API 통신
  const postOrder = async () => {
    try {
      //const response = await axios.post(`${PLAN_API_URI}`);
      //console.log(response.data);
      //setProduct(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    //getOrder();
  }, []);

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
