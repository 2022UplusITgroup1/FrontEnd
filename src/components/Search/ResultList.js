import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import styles from "./ResultList.module.css";
import { Select } from "@chakra-ui/react";
import Product from "./ResultProduct";
import { changePlan } from "../../actions";
import mapBrandName from "../../utils/mapBrandName";

function ResultList({ products, plans, category }) {
  const dispatch = useDispatch();
  // 현재 선택한 옵션 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 가장 알맞은 요금제는 가장 첫번째 요금제로
  let plan = [];
  if (options.planValue === "0" && plans.length !== 0) {
    plan = plans[0];
    //dispatch(changePlan(plan.code));
  } else {
    plan = plans.find((p) => p.code === options.planValue);
  }

  // 선택한 정렬값 저장
  const [isSelect, setIsSelect] = useState(0);
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
  };

  // 현재 선택된 제조사에 맞게 filter
  let selectedProduct = products.filter(
    (p) => p["brand"]["name"] === mapBrandName(options.brandValue)
  );
  if (options.brandValue === "0") selectedProduct = products;

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
      </div>
      <div className={styles.ResultListContainer}>
        <div className={styles.ResultListContent}>
          {/* 상품 리스트 */}
          <div className={styles.ProductList}>
            {selectedProduct.length > 0 &&
              selectedProduct.map((p, i) => {
                return (
                  <Product
                    product={p}
                    plan={plan}
                    category={category}
                    key={i}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultList;
