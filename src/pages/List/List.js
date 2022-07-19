import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./List.module.css";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";

const PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/phone?net_sp=`;
const PLAN_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/plan?net_sp=`;

function List({ category }) {
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  // GET 상품 전체 리스트
  const getProducts = async () => {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}${category}`);
      console.log("getProducts SUCCESS ");
      setProducts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // GET 요금제 전체 리스트
  const getPlans = async () => {
    try {
      const response = await axios.get(`${PLAN_API_URL}${category}`);
      console.log("getPlans SUCCESS ");
      setPlans(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //getProducts();
    //getPlans();
    setProducts(SampleData);
    setPlans(SamplePlanData);
  }, []);

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListContents}>
        <div className={styles.ListTitle}>
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.ListOption}>
            <Option plans={plans} />
          </div>
          <div className={styles.ListItems}>
            <ProductList
              products={products}
              plans={plans}
              category={category}
            />
          </div>
          <div className={styles.RecentlyViewed}>
            {/* 최근 본 상품은 따로 처리 필요 */}
            <RecentlyViewed
              products={latestProducts}
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
