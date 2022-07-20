// 상품 리스트 페이지 리스트 섹션 (전체 상품 개수 + 정렬 + 상품 리스트 )

import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import { Select } from "@chakra-ui/react";
import Product from "./Product";
import { changeProductSort } from "../../actions";
import mapBrandName from "../../utils/mapBrandName";

// 상세 정보 조회 URL
const SELECTED_PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/product/phone?net_sp=`;

function ProductList({ products, plans, category }) {
  const dispatch = useDispatch();
  // 현재 선택한 옵션 값 가져오기
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  // 현재 선택된 옵션 값 담는 변수
  const [nowOption, setNowOption] = useState({
    planType: "0",
    discountType: "0",
    brandType: "0",
    storageType: "0",
    sortType: "0",
  });

  // 조건에 맞는 상품들
  const [selectedProducts, setSelectedProducts] = useState([]);

  // GET 상품 조건 리스트
  const getSelectedProducts = async () => {
    try {
      const response = await axios.get(
        `${SELECTED_PRODUCT_API_URL}${category}&mf_name=${nowOption.brandType}&capa=${nowOption.storageType}&ord=${nowOption.sortType}`
      );
      console.log("getSelectedProducts SUCCESS ");
      setSelectedProducts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 정렬 함수 따로 빼기!!!!

  // 옵션이 바뀌면 현재 옵션(nowOption)에도 적용
  useEffect(() => {
    setNowOption({
      planType: options.planType,
      discountType: options.discountType,
      brandType: options.brandType,
      storageType: options.storageType,
      sortType: options.sortType,
    });
  }, [options]);

  // 현재 옵션이 바뀔 때마다 API 조건 조회
  useEffect(() => {
    //getSelectedProducts();
    //console.log(products);
    setSelectedProducts(products);
    // 정렬함수();
  }, [nowOption]);

  // 선택한 정렬값 저장
  const [isSelect, setIsSelect] = useState("0");
  const onSelectChange = (e) => {
    setIsSelect(e.target.value);
    dispatch(changeProductSort(e.target.value));
  };

  // MYSEO CREATED
  useEffect(() => {
    //정렬함수();
  }, [isSelect]);

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
                      nowOption.planType === "0"
                        ? plans[0] // 가장 알맞은 요금제는 첫번째로
                        : findSelectPlan(nowOption.planType)
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
    </div>
  );
}

export default ProductList;
