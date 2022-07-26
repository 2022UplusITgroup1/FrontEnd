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
import validation from "../../utils/validation";

const INQUIRY_REQUEST_URL = `/order/my`;

// ?name=김유플&phone_number=01012340001&order_number=20220720110539807351

function Inquiry() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [orderNumber, setOrderNum] = useState("");
  const [productOrder, setOrder] = useState({});

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
  const onOrderNumChange = (e) => {
    if (validation("string", e.target.value)) {
      setOrderNum(e.target.value);
    } else {
      alert("주문번호를 입력하세요");
    }
  };

  useEffect(() => {
    // 맨 처음 렌더링 -> 초기화
    // dispatch(resetOrderInquiryInfo());
  }, []);

  // dispatch(setOrderInquiryInfo(name:"",));

  const history = useHistory();

  const getOrder = async (name, phoneNumber, orderNumber) => {
    //console.log(name, phoneNumber, orderNumber);

    try {
      const response = await customAxios.get(
        `${INQUIRY_REQUEST_URL}?name=${name}&phone_number=${phoneNumber}&order_number=${orderNumber}`
      );
      console.log(response.data.data);
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
      setOrder(response.data.data);
      console.log("productOrder", productOrder);
      dispatch(setOrderInquiryInfo(productOrder));

      history.push("/mobile/inquiry-result");
      // window.location.href="/mobile/inquiry-result";
      // history.p
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = (name, phoneNumber, orderNumber) => {
    console.log(name, phoneNumber, orderNumber);
    // setSearchWord(word);
    getOrder(name, phoneNumber, orderNumber);
  };

  const onKeyPress = (e) => {
    alert(name, phoneNumber, orderNumber);
    onClick(name, phoneNumber, orderNumber);

    // if(e.key ==='Enter'){
    //   alert(name, phoneNumber,orderNumber);
    //   onClick(name, phoneNumber,orderNumber);

    // }
  };

  useEffect(() => {
    // store 에 저장
    dispatch(
      setOrderInquiryInfo({
        name: name,
        phoneNumber: phoneNumber,
        orderNumber: orderNumber,
      })
    );
  }, [name, phoneNumber, orderNumber]);

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
            <Link to="/mobile/inquiry-result">
              <Button className={styles.InquiryBtn} onMouseDown={onKeyPress}>
                조회하기
              </Button>
              {/* <Input
              type="button"
              placeholder="조회하기"
              className={styles.InquiryBtn}
              onMouseDown={onKeyPress}
              /> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
