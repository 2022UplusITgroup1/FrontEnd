import React, { useState } from "react";
import styles from "./ProductList.module.css";
import Product from "./Product";
import { Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import mapBrandName from "../../utils/mapBrandName";

function ProductList({ product, plan }) {
  const [isSelect, setIsSelect] = useState(0);
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
  };

  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  let selectedProduct = product.filter(
    (p) => p["brand"]["name"] === mapBrandName(options.brandValue)
  );
  if (options.brandValue === "0") selectedProduct = product;
  //console.log(selectedProduct);

  selectedProduct = selectedProduct.filter(
    (p) => p["storage"]["capability"] >= Number(options.storageValue)
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* 전체 개수 & 정렬 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>
            전체 {selectedProduct.length}건
          </div>
        </div>
        <div className={styles.SelectSort}>
          <Select variant="flushed" value={isSelect} onChange={onSelectChange}>
            <option value={0}>주간 판매량이 많은 순</option>
            <option value={1}>최근 출시된 상품 순</option>
            <option value={2}>실 구매가가 낮은 상품 순</option>
            <option value={3}>정상가가 낮은 순</option>
            <option value={4}>정상가가 높은 순</option>
            <option value={5}>누적 판매량이 많은 순</option>
          </Select>
        </div>
      </div>
      <div className={styles.ProductListContainer}>
        <div className={styles.ProductList}>
          {/* 상품 리스트 */}
          {selectedProduct.map((p, i) => {
            return <Product product={p} plans={plan} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
