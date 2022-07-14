import React, { useState } from "react";
import styles from "./Order.module.css";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import { Input, Button } from "@chakra-ui/react";

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
    alert("주문이 완료되었습니다");
  };
  const property = {
    imageUrl:
      "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-073051-526-l4VusvGl.jpg",
    imageAlt: "Galaxy Buddy 2",
    title: "Galaxy Buddy 2",
    subTitle: "5G 라이트+ | 공시지원금",
    phone: "0",
    communication: "55,000",
    formattedPrice: "55,000",
    color: "라이트 블루",
    capacity: "128GB",
    joinType: "기기변경",
  };
  return (
    <div className={styles.Container}>
      <div className={styles.OrderInfo}>
        <div className={styles.OrderInfoTitle}>가입자 정보</div>
        <form className={styles.InputInfo} onSubmit={onSubmit}>
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
        <OrderDetail property={property} />
      </div>
    </div>
  );
}

export default Order;
