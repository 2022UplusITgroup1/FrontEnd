import React from "react";
import styles from "./ProductList.module.css";
import Product from "./Product";

function ProductList({ category }) {
  return (
    <div>
      <div className={styles.InfoArea}>
        {/* 전체 개수 & 정렬 */}
        전체 32건
      </div>
      <div className={styles.ProductList}>
        {/* 상품 리스트 */}
        <Product />
        <Product />
      </div>
    </div>
  );
}

export default ProductList;
