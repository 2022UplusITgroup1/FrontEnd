// 상품 리스트 페이지

import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";
import SampleRecentlyData from "../../SampleRecentlyData.json";

// API URI
const PRODUCTS_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/product?net_sp=`;
const PLANS_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/plan?net_sp=`;
const RECENT_PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/recents`;

function List({ category }) {
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [recentlyProducts, setRecentlyProducts] = useState([]);

  // GET 상품 전체 리스트
  const getProducts = async () => {
    try {
      const response = await axios.get(`${PRODUCTS_API_URL}${category}`);
      console.log("getProducts SUCCESS ");
      setProducts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // GET 요금제 전체 리스트
  const getPlans = async () => {
    try {
      const response = await axios.get(`${PLANS_API_URL}${category}`);
      console.log("getPlans SUCCESS ");
      setPlans(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // GET 최근 본 상품 전체 리스트
  const getRecents = async () => {
    try {
      const response = await axios.get(`${RECENT_PRODUCT_API_URL}`);
      console.log("getRecents SUCCESS ");
      setRecentlyProducts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 데이터 가져오기
    //getProducts();
    //getPlans();
    //getRecents();
    setProducts(SampleData);
    setPlans(SamplePlanData);
    setRecentlyProducts(SampleRecentlyData);
  }, []);

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListContents}>
        <div className={styles.ListTitle}>
          {/* 페이지 타이틀 */}
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.ListOption}>
            {/* 옵션 아코디언 */}
            <Option plans={plans} />
          </div>
          <div className={styles.ListItems}>
            {/* 상품 리스트 섹션 */}
            <ProductList
              products={products}
              plans={plans}
              category={category}
            />
          </div>
          <div className={styles.RecentlyViewed}>
            {/* 최근 본 상품 */}
            <RecentlyViewed
              products={products}
              plans={plans}
              category={category}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
