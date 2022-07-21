// 상품 리스트 페이지 리스트 섹션 (전체 상품 개수 + 정렬 + 상품 리스트)

import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import { Select, useDisclosure } from "@chakra-ui/react";
import Product from "./Product";
import { changeProductSort } from "../../actions";
import mapBrandName from "../../utils/mapBrandName";
import Compare from "../Compare/Compare";

// 상세 정보 조회 URL
const SELECTED_PRODUCT_API_URL = `http://localhost:8000/product/phone?net_sp=`;

function ProductList({ products, plans, category }) {
  //console.log(products);
  //console.log(plans);

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 현재 선택한 옵션 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  console.log(options);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 조건에 맞는 상품들
  const [selectedProducts, setSelectedProducts] = useState([]);
  //console.log(selectedProducts);

  useEffect(() => {
    // 맨 처음 렌더링 될 때는 products 값으로 초기화
    if (!selectedProducts.length) setSelectedProducts(products);
  }, [products]);

  // API GET 상품 조건 리스트
  const getSelectedProducts = async (brandType, storageType, sortType) => {
    // 조회해야하는 조건만 URL 에 추가
    let OPTION_URL = `http://localhost:8000/product/phone?net_sp=${category}`;
    if (brandType !== "0") {
      OPTION_URL += `&mf_name=${brandType}`;
    }
    if (storageType !== "0") {
      OPTION_URL += `&capa=${storageType}`;
    }
    // !!! 정렬 값은 실사용 여부에 따라
    if (sortType !== "0") {
      OPTION_URL += `&ord=${options.sortType}`;
    }

    // API GET
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(OPTION_URL);
      console.log("getSelectedProducts SUCCESS ");
      // 조건 조회 결과가 없을 경우는 빈 배열로 설정
      setSelectedProducts(
        response.data.data !== null ? response.data.data : []
      );
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // 옵션 값이 변경될 때마다 실행
  useEffect(() => {
    console.log(options.brandType, options.storageType);
    // 하나라도 선택된 조건이 있다면 API GET 호출
    if (options.brandType !== "0" || options.storageType !== "0") {
      getSelectedProducts(
        options.brandType,
        options.storageType,
        options.sortType
      );
    } else {
      // 전체에 선택되어 있다면 기존 products 로 set
      if (selectedProducts.length !== products.length) {
        setSelectedProducts(products);
      }
    }
    //getSelectedProducts();
  }, [options]);

  // 선택한 정렬값 저장
  const [isSelect, setIsSelect] = useState("0");
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
    dispatch(changeProductSort(e.target.value));
  };

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {/* 전체 개수 */}
        <div className={styles.TotalCount}>
          <div className={styles.TotalCountTxt}>
            전체 {selectedProducts.length}건
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
            {selectedProducts.length > 0 &&
              selectedProducts.map((p, i) => {
                return (
                  <Product
                    product={p}
                    plan={
                      options.planType === "0"
                        ? plans[0] // 가장 알맞은 요금제는 첫번째로
                        : findSelectPlan(options.planType)
                    }
                    category={category}
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

      {/* {<div className={styles.Compare}>
        <Compare isOpen={isOpen} onClose={onClose} className={styles.Compare} />
      </div>} */}
    </div>
  );
}

export default ProductList;
