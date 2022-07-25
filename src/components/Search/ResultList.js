import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import styles from "./ResultList.module.css";
import { Select } from "@chakra-ui/react";
import ResultProduct from "./ResultProduct";
import { changePlan } from "../../actions";
import mapBrandName from "../../utils/mapBrandName";

function ResultList({ products, plans, plan4g, plan5g }) {
  const dispatch = useDispatch();
  // 현재 선택한 옵션 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);
  

  // 가장 알맞은 요금제는 가장 첫번째 요금제로
  //4g 5g 일치할때
  let plan = [];
  let pl;
  if (options.planValue === "0" && plans.length !== 0) {
    plan = plans[0];
    //dispatch(changePlan(plan.code));
  } else {
    plan = plans.find((p) => p.code === options.planValue);
  }

  for(plan in plans){


  }

  const findSelectPlan = (value) => {
    console.log("findSelectPlan",value);
    return plans.find((p) => p.code === value);
  };

  // 선택한 정렬값 저장
  // const [isSelect, setIsSelect] = useState(0);
  // const onSelectChange = (e) => {
  //   setIsSelect(e.target.value);
  // };

  // // 현재 선택된 제조사에 맞게 filter
  // let selectedProduct = products.filter(
  //   (p) => p["brand"]["name"] === mapBrandName(options.brandValue)
  // );
  // if (options.brandValue === "0") selectedProduct = products;

  // // 현재 선택된 저장용량에 맞게 filter
  // if (
  //   Number(options.storageValue) === 512 ||
  //   Number(options.storageValue) === 0
  // ) {
  //   selectedProduct = selectedProduct.filter(
  //     (p) => p["storage"]["capability"] >= Number(options.storageValue)
  //   );
  // } else {
  //   selectedProduct = selectedProduct.filter(
  //     (p) => p["storage"]["capability"] === Number(options.storageValue)
  //   );
  // }
  // 

  console.log(plans);

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* 전체 개수 & 정렬 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>
            전체 {products.length}건
          </div>
        </div>
      </div>
      <div className={styles.ResultListContainer}>
        <div className={styles.ResultListContent}>
          {/* 상품 리스트 */}
          <div className={styles.ProductList}>
            {products.length > 0 &&
              products.map((p, i) => {
                return (
                  <ResultProduct
                    product={p}
                    plan={
                      options.planType === "0"
                      ? plans[0] // 가장 알맞은 요금제는 첫번째로
                      : findSelectPlan(options.planType)
                    }

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
