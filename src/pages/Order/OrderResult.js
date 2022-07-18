import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./OrderResult.module.css";
import { Button } from "@chakra-ui/react";

function OrderResult() {
  const [word, setWord] = useState("");
  const onChange = (e) => {
    setWord(e.target.value);
    console.log(e.ta);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.OrderResultContatiner}>
        <div className={styles.OrderResult}>
          <div className={styles.OrderResultCheck}>
            <FiCheckCircle
              size="50"
              color="green"
              className={styles.OrderResultCheckIcon}
            />
          </div>
          <div className={styles.OrderResultTitle}>
            주문이 완료되었습니다.
            <br />
            감사합니다.
          </div>
        </div>
        <div className={styles.ResultBtnContainer}>
          <Link to="/">
            <Button className={styles.ResultBtn}>확인</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderResult;
