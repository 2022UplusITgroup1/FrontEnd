import React, { useState } from "react";
import styles from "./Result.module.css";
import { Input, Button } from "@chakra-ui/react";

function Result() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
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
        <div className={styles.OrderInfoTitle}>주문 조회</div>
        <div className={styles.InputInfo}>
          <div className={styles.Info}>
            <div className={styles.Title}>이름</div>
            <div className={styles.Content}>김유플</div>
          </div>
          <div className={styles.Info}>
            <div className={styles.Title}>상품 정보</div>
            <div className={styles.MainImg}>
              <img
                className={styles.MainImg}
                src={property.imageUrl}
                alt="PRODUCT"
              />
            </div>
            <div className={styles.ContentTitle}>{property.title}</div>
            <div className={styles.Content}>{property.subTitle}</div>
            <div className={styles.Content}>{property.color}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
