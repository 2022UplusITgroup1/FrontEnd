// 주문 조회 페이지

import React, { useEffect, useState } from "react";
import styles from "./Inquiry.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import customAxios from "../../lib/customAxios";
import { Input, Button } from "@chakra-ui/react";
import { resetOrderInquiryInfo, setOrderInquiryInfo } from "../../actions";
import { useHistory } from "react-router";
import validateOrderInquiry from "../../utils/validateOrderInquiry";

const INQUIRY_REQUEST_URL = `/order/my`;
const INQUIRY_REQUEST_URL_LOCAL = `http://localhost:8000/order/my`;

// ?name=김유플&phone_number=01012340001&order_number=20220720110539807351

function Inquiry() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [orderNumber, setOrderNum] = useState("");
  const [productOrder, setOrder] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const onOrderNumChange = (e) => {
    setOrderNum(e.target.value);
  };

  useEffect(() => {
    // 맨 처음 렌더링 -> 초기화
    // dispatch(resetOrderInquiryInfo());
  }, []);

  // dispatch(setOrderInquiryInfo(name:"",));

  const history = useHistory();

  const getOrder = async (name, phoneNumber, orderNumber) => {
    //console.log(name, phoneNumber, orderNumber);
    let res={};

    try {
      // const response = await customAxios.get(
      //   `${INQUIRY_REQUEST_URL}?name=${name}&phone_number=${phoneNumber}&order_number=${orderNumber}`
      // );
      const response = await axios.get(
        `${INQUIRY_REQUEST_URL_LOCAL}?name=${name}&phone_number=${phoneNumber}&order_number=${orderNumber}`
      );
      // console.log(response.data.data); 
      // if (response.data.data !== null) {  
      //   console.log("getProducts SUCCESS ");
      //   // color 가 다른 기종은 처음 값으로 처리
      //   const res = response.data.data;
      //   let filteredRes = res.filter((item, i) => {
      //     return (
      //       res.findIndex((item2, j) => {
      //         return item.code === item2.code;
      //       }) === i
      //     );
      //   });
      //   console.log(filteredRes);
      //   setProducts(filteredRes);
      // }
      // let data={name:{name}, phoneNumber:{phoneNumber}, orderNumber:{orderNumber}};
      console.log(response.data.data);
      
      res=response.data.data;

      setOrder(res);
      
      console.log("productOrder", productOrder);

      
      // history.push("/mobile/inquiry-result");

      
      // window.location.href="/mobile/inquiry-result";
      // history.p
    } catch (e) {
      console.log(e);

    }


  };

  


  const onClickInquiryBtn = (e) => {
    //alert(name, phoneNumber, orderNumber);
    console.log(name, phoneNumber, orderNumber);
    if (validateOrderInquiry({ name, phoneNumber, orderNumber })) {
      getOrder(name, phoneNumber, orderNumber);
      // dispatch(setOrderInquiryInfo(productOrder));
      // history.push("/mobile/inquiry-result");
    } else {
      alert("주문 조회 정보가 잘못되었습니다");
    }
  };

  useEffect(() => {
    // setOrder({});
    // store 에 저장
    dispatch(
      setOrderInquiryInfo({
        name: name,
        phoneNumber: phoneNumber,
        orderNumber: orderNumber,
      })
    );
  }, [name, phoneNumber, orderNumber]);


  useEffect(()=>{
      console.log("productOrder",productOrder);
      dispatch(setOrderInquiryInfo(productOrder));
      if(productOrder!=""){
        history.push("/mobile/inquiry-result");
      }

  },[productOrder]);

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
              value={phoneNumber}
              onChange={onNumberChange}
            />
          </label>
          <label htmlFor="inputEmail" className={styles.Input}>
            주문 번호
            <Input
              variant="flushed"
              id="inputEmail"
              type="text"
              value={orderNumber}
              onChange={onOrderNumChange}
            />
          </label>
          <div className={styles.InquiryBtnContainer}>
            <Button className={styles.InquiryBtn} onClick={onClickInquiryBtn}>
              조회하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
