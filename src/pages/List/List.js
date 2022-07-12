import React from "react";
import styles from "./List.module.css";
import Option from "../../components/Option";
import ProductList from "../../components/ProductList/ProductList";

function List({ category }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Contents}>
        <div className={styles.Title}>
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.Options}>
            <Option category={category} />
          </div>
          <div className={styles.ItemList}>
            <ProductList category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
