import React, { useState } from "react";
import styles from "./ProductList.module.css";
import Product from "./Product";
import { Select } from "@chakra-ui/react";
import {useSelector} from "react-redux";

function ProductList({ product, plan }) {
  const [isSelect, setIsSelect] = useState("0");
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
  };
  const options = useSelector(state => state.changeOptionReducer);
  console.log(options);
  

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* 전체 개수 & 정렬 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>전체 32건</div>
        </div>
        <div className={styles.SelectSort}>
          <Select variant="flushed" value={isSelect} onChange={onSelectChange}>
            <option value="0">주간 판매량이 많은 순</option>
            <option value="1">최근 출시된 상품 순</option>
            <option value="2">실 구매가가 낮은 상품 순</option>
            <option value="3">정상가가 낮은 순</option>
            <option value="4">정상가가 높은 순</option>
            <option value="5">누적 판매량이 많은 순</option>
          </Select>
        </div>
      </div>
      <div className={styles.ProductList}>
        {/* 상품 리스트 */}
        {product.map((p, i) => {
          return <Product product={p} options={options} key={i} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
