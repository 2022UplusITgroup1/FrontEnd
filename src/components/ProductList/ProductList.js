import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import styles from "./ProductList.module.css";
import { Select } from "@chakra-ui/react";
import Product from "./Product";
import mapBrandName from "../../utils/mapBrandName";

function ProductList({ products, plans, category }) {
  // 선택한 정렬값 저장
  const [isSelect, setIsSelect] = useState(0);
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
  };

  // 현재 옵션 선택 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 현재 선택된 제조사에 맞게 filter
  let selectedProduct = products.filter(
    (p) => p["brand"]["name"] === mapBrandName(options.brandValue)
  );
  if (options.brandValue === "0") selectedProduct = products;
  //console.log(selectedProduct);

  // 현재 선택된 저장용량에 맞게 filter
  if (
    Number(options.storageValue) === 512 ||
    Number(options.storageValue) === 0
  ) {
    selectedProduct = selectedProduct.filter(
      (p) => p["storage"]["capability"] >= Number(options.storageValue)
    );
  } else {
    selectedProduct = selectedProduct.filter(
      (p) => p["storage"]["capability"] === Number(options.storageValue)
    );
  }

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
        <div className={styles.ProductListContent}>
          {/* 상품 리스트 */}
          <div className={styles.ProductList}>
            {selectedProduct.length > 0 &&
              selectedProduct.map((p, i) => {
                return (
                  <Product
                    product={p}
                    plans={plans}
                    category={category}
                    key={i}
                  />
                );
              })}
          </div>
          {selectedProduct.length === 0 && (
            <div className={styles.NoProductListContainer}>
              <div className={styles.NoProductList}>
                <div className={styles.NoProductListAlert}>
                  <FiAlertCircle size="80" color="lightgray" />
                </div>
                <div className={styles.NoProductListTxt}>
                  선택하신 조건에 맞는 상품이 없습니다.
                </div>
                <div className={styles.NoProductListTxt}>
                  다른 조건을 선택해 주세요.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
