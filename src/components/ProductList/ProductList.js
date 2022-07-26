// 상품 리스트 페이지 리스트 섹션 (전체 상품 개수 + 정렬 + 상품 리스트)

import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import customAxios from "../../lib/customAxios";
import { FiAlertCircle } from "react-icons/fi";
import { Select, useDisclosure } from "@chakra-ui/react";
import Product from "./Product";
import { changeBrand, changeProductSort, changeStorage } from "../../actions";
import Compare from "../Compare/Compare";
import ErrorPage from "../../pages/Exception/ErrorPage";
import calcPrices from "../../utils/calcPrices";
import mapBrandName from "../../utils/mapBrandName";
import mapStorageType from "../../utils/mapStorageType";

// 상세 정보 조회 URI
const SELECTED_PRODUCT_API_URI = `/product/phone?net_sp=`;

function ProductList({ products, plans, netType }) {
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();

  // 현재 선택한 옵션 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const onClickDeleteBrandOption = (e) => {
    dispatch(changeBrand("0"));
  };

  const onClickDeleteStorageOption = (e) => {
    dispatch(changeStorage("0"));
  };

  // 데이터 에러 처리
  const [error, setError] = useState(null);

  // 조건에 맞는 상품들 (GET)
  const [unsortedProducts, setUnsortedProducts] = useState(products);
  // 정렬까지 마친 상품들
  const [selectedProducts, setSelectedProducts] = useState(products);

  // 선택한 정렬값 저장
  const [isSelect, setIsSelect] = useState(options.sortType);
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
    dispatch(changeProductSort(e.target.value));
  };

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  /* ----- MYSEO CREATED ----- */
  // MYSEO CREATED - 상품 정렬
  const sortArray = (type) => {
    const types = {
      0: "createTime",
      1: "price", // 실구매가로 변경
      2: "price",
      3: "price",
      4: "sales",
    };
    const sortProperty = types[type];
    let sortDirection = 0; // 0: DESC , 1: ASC
    if (type === 1 || type === 2) sortDirection = 1;
    let sorted = [...unsortedProducts]; // 복사해서 사용해야 기존 값에 영향 X
    // JSH: 실구매가 정렬은 별도 처리
    if (type === 1) {
      sorted = sorted.sort((a, b) => {
        let planTypeA = findSelectPlan(a.planCode).price;
        let planTypeB = findSelectPlan(b.planCode).price;
        // 요금제가 선택되어 있는 경우, 선택된 요금제로 계산
        if (options.planType !== "0") {
          planTypeA = findSelectPlan(options.planType).price;
          planTypeB = findSelectPlan(options.planType).price;
        }
        let discountTypeA = a.discountType.toString();
        let discountTypeB = b.discountType.toString();
        // 할인 유형이 선택되어 있는 경우, 선택된 할인 유형으로 계산
        if (options.discountType !== "0") {
          discountTypeA = options.discountType;
          discountTypeB = options.discountType;
        }
        let priceA = calcPrices(a.price, planTypeA, discountTypeA, 24);
        let priceB = calcPrices(b.price, planTypeB, discountTypeB, 24);
        return priceA.total - priceB.total;
      });
    } else {
      sorted = sorted.sort((a, b) =>
        sortDirection === 0
          ? b[sortProperty] - a[sortProperty]
          : a[sortProperty] - b[sortProperty]
      );
    }
    //console.log("sorted!");
    setSelectedProducts(sorted);
  };

  // MYSEO CREATED - 상품 정렬 실행
  useEffect(() => {
    sortArray(Number(isSelect));
  }, [isSelect]);
  /* ----- END ----- */

  // API GET 상품 조건 리스트
  const getSelectedProducts = async (
    brandType,
    storageType,
    planType,
    sortType
  ) => {
    // 조회해야하는 조건만 URI 에 추가
    let OPTION_URI = `${SELECTED_PRODUCT_API_URI}${netType}`;
    if (brandType !== "0") {
      OPTION_URI += `&mf_name=${brandType}`;
    }
    if (storageType !== "0") {
      OPTION_URI += `&capa=${storageType}`;
    }
    if (planType === "0") {
      OPTION_URI += `&plan=${plans[0].code}`;
    } else {
      OPTION_URI += `&plan=${planType}`;
    }
    //OPTION_URI += `&ord=${sortType}`;
    //console.log(OPTION_URI);

    // API GET
    try {
      setError(null);
      const response = await customAxios.get(OPTION_URI);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("getSelectedProducts SUCCESS ");
        // color 가 다른 기종은 처음 값으로 처리
        const res = response.data.data;
        let filteredRes = res.filter((item, i) => {
          return (
            res.findIndex((item2, j) => {
              return item.code === item2.code;
            }) === i
          );
        });
        //console.log(filteredRes);
        setUnsortedProducts(filteredRes);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setUnsortedProducts([]);
      }
    } catch (e) {
      //console.log(e);
      setError(e);
    }
  };

  // 현재 옵션이 바뀔 때마다 API 조건 조회
  useEffect(() => {
    // 하나라도 바뀐 조건이 있다면 API GET 호출
    getSelectedProducts(
      options.brandType,
      options.storageType,
      options.planType,
      options.sortType
    );
  }, [options]);

  // 조건 조회 후에는 정렬 적용
  useEffect(() => {
    sortArray(Number(isSelect));
  }, [unsortedProducts]);

  // 현재 비교하기 isOpen
  const compares = useSelector((state) => state.compareReducer);
  //console.log(compares.isOpen);

  //if (error) return <ErrorPage />;
  if (!products) return null;
  if (!plans) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* 전체 개수 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>
            전체 {selectedProducts.length}건
          </div>
          <div className={styles.OptionTags}>
            {/* 옵션 태그 - 제조사 */}
            {options.brandType !== "0" && (
              <div className={styles.SelectedTagContainer}>
                <div className={styles.SelectedTag}>
                  {mapBrandName(options.brandType) + " "}
                  <button onClick={onClickDeleteBrandOption}>X</button>
                </div>
              </div>
            )}
            {/* 옵션 태그 - 저장용량 */}
            {options.storageType !== "0" && (
              <div className={styles.SelectedTagContainer}>
                <div className={styles.SelectedTag}>
                  {mapStorageType(options.storageType) + " "}
                  <button onClick={onClickDeleteStorageOption}>X</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 정렬 */}
        <div className={styles.SelectSort}>
          <Select variant="flushed" value={isSelect} onChange={onSelectChange}>
            <option value="0">최근 출시된 상품 순</option>
            <option value="1">실 구매가가 낮은 상품 순</option>
            <option value="2">정상가가 낮은 순</option>
            <option value="3">정상가가 높은 순</option>
            <option value="4">누적 판매량이 많은 순</option>
          </Select>
        </div>
      </div>
      <div className={styles.ProductListContainer}>
        <div className={styles.ProductListContent}>
          {/* 상품 리스트 */}
          <div className={styles.ProductList}>
            {selectedProducts.length &&
              selectedProducts.map((p, i) => {
                return (
                  <Product
                    product={p}
                    plan={
                      options.planType === "0"
                        ? plans[0] // 가장 알맞은 요금제는 첫번째로
                        : findSelectPlan(options.planType)
                    }
                    netType={netType}
                    key={i}
                  />
                );
              })}
          </div>
          {/* 상품 리스트가 없을 경우 */}
          {selectedProducts.length === 0 && (
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

      <div className={styles.Compare}>
        <Compare
          isOpen={compares.isOpen}
          onClose={onClose}
          className={styles.Compare}
        />
      </div>
    </div>
  );
}

export default ProductList;
