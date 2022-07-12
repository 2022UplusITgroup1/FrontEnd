import React from "react";
import styles from "./List.module.css";

function List({ category }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Contents}>
        <div className={styles.Title}>
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}></div>
      </div>
    </div>
  );
}

export default List;
