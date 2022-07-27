// 주문 페이지

import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import customPostAxios from "../../lib/customPostAxios";
import { Input, Button } from "@chakra-ui/react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import validateOrder from "../../utils/validateOrder";
import ErrorPage from "../Exception/ErrorPage";
import { setOrderDetailInfo } from "../../actions";


const ORDER_REQUEST_URL = `/order/payment`;



function Order() {
  const dispatch = useDispatch();

  const orderProduct = useSelector((state) => state.orderReducer);
  const history = useHistory();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [productOrder, setOrder] = useState({});

  const [phone, setPhone] = useState(orderProduct.phone);
  const [plan, setPlan] = useState(orderProduct.plan);
  const [discountType, setDiscountType] = useState(orderProduct.discountType);
  const [payPeriod, setPayPeriod] = useState(orderProduct.payPeriod);
  const [monthPrice, setMonthPrice] = useState(orderProduct.monthPrice);

  const [orderResult, setOrderResult] = useState({});

  // discountType: data.discountType,
  //     monthPrice: data.monthPrice,
  //     payPeriod: data.payPeriod,

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




  const postOrder = async (name,email,address,number) => {
    console.log("phone",phone);

    let requestBody={
      name: name,
      email: email,
      address: address,
      number: number,
      phone: phone,
      plan: plan
    };


    try {
      // setError(null);
      const response = await customPostAxios.post(`${ORDER_REQUEST_URL}`, requestBody);

      if (response.data.data !== null) {
        console.log("fetchCompareData SUCCESS ");
        // const res = [...response.data.data];
        // // 빈 부분 개수 저장
        // setEmptyLength(3 - res.length);
        // //console.log(res.length);
        // // 3개가 되지 않으면 empty 처리
        // for (let i = res.length; i < 3; i++) {
        //   res.push(initialData);
        // }
        // setCompareData(res);

        console.log(response);

        // setName(name);
        // setEmail(email);
        // setAddress(address);
        // setNumber(number);
        console.log(requestBody);
        setOrderResult(requestBody);
      }

      // setName(name);
      // setEmail(email);
      // setAddress(address);
      // setNumber(number);




    } catch (e) {
      console.log(e);
      // setError(e);
    }


  };

  





  const onSubmit = (e) => {
    e.preventDefault();

    console.log("subit",name, number, email, address);
    if (validateOrder({ name, number, email, address })) {
      postOrder( name, number, email, address );
      // history.push("/mobile/order-result");
    } else {
      alert("주문 정보가 잘못되었습니다");
    }
    //console.log(name, number, email, address);
  };


  
  //console.log(orderProduct);

  // useEffect(()=>{
  //   console.log("orderResult",orderResult);
  //   dispatch(setOrderDetailInfo(orderResult));
  //   if(orderResult!=""){
  //     history.push("/mobile/inquiry-result");
  //   }

  // },[productOrder]);

  useEffect(() => {
    // setOrder({});
    // store 에 저장
    dispatch(
      setOrderDetailInfo({

        name: name,
        number: number,
        email: email,
        address:address,
        phone:phone,
        plan:plan,
        discountType:discountType,
        payPeriod:payPeriod,
        monthPrice:monthPrice

      })
    );

    console.log("orderResult",orderResult);
    dispatch(setOrderDetailInfo(orderResult));
    // if(orderResult!=""){
    //   history.push("/mobile/order-result");
    // };


  }, [orderResult]);

  console.log("orderProduct",orderProduct);

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
