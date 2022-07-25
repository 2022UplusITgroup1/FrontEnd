// 통신 Error 페이지

import React from "react";
import styles from "./Exception.module.css";
import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function ErrorPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.ResultContatiner}>
        <div className={styles.Result}>
          <div className={styles.ResultCheck}>
            <FiXCircle
              size="50"
              color="red"
              className={styles.ResultCheckIcon}
            />
          </div>
          <div className={styles.ResultTitle}>ERROR</div>
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

export default ErrorPage;
