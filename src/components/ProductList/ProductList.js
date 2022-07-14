import React from "react";
import styles from "./ProductList.module.css";
import Product from "./Product";
import { Select } from "@chakra-ui/react";

function ProductList({ category }) {
  return (
    <div>
      <div className={styles.Container}>
        {/* 전체 개수 & 정렬 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>전체 32건</div>
        </div>
        <div className={styles.SelectSort}>
          <Select variant="flushed" placeholder="최근 출시된 상품 순">
            <option value="option1">정상가가 낮은 순</option>
            <option value="option2">정상가가 높은 순</option>
            <option value="option3">실 구매가가 낮은 상품 순</option>
          </Select>
        </div>
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
