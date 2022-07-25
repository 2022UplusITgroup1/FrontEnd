// 메인 페이지

import React from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <div className={styles.Container}>
      <img
        src="https://image.lguplus.com/static/pc-contents/images/fcmm/cnts/imge/20220621-093605-021-6OIrKI76.png"
        alt="MAIN"
        className={styles.MainImg}
      />
    </div>
  );
}

export default Main;
