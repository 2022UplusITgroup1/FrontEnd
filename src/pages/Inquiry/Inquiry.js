import React, { useState } from "react";
import styles from "./Inquiry.module.css";
import { Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const INQUIRY_REQUEST_URL = `http://localhost:8000/order/my`;



function Inquiry() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const onNameChange = (e) => setName(e.target.value);
  const onNumberChange = (e) => setNumber(e.target.value);
  const onOrderNumChange = (e) => setOrderNum(e.target.value);

  // const ToDoListHandler = () => {
  //   axios.get('https://localhost:4000/sendlist/todo', 
  //     {params: {userId: userId}}, 
  //     { withCredentials: true }
  //   )
  //   .then((res)=> {
  //     setToDoList(res.data.data)
  //   })
  // }

  


  // const getOrder = async (name,number,orderNum) => {
  //   try {
      
  //     const response = await axios.get(`${INQUIRY_REQUEST_URL}`,
  //       {params: {name:name, number:number, orderNum:orderNum}},
  //       { withCredentials: true }
  //     )
  //     .then((response)=>{
  //       console.log("getOrder SUCCESS ");
  //       console.log(response.data.data);
  //       setProducts(response.data.data);
  //     });
      
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (options.discountValue === "0") {
  //     setDetailURL(
  //       `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`
  //     );
  //     setDiscountValue(product.discountType.toString());
  //   } else {
  //     setDetailURL(
  //       `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${options.discountValue}`
  //     );
  //     setDiscountValue(options.discountValue);
  //   }
  // }, [options]);


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
