import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";
import axios from "axios";

const PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/phone?net_sp=`;
const PLAN_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/plan?net_sp=`;

function List({ category }) {
  const [product, setProduct] = useState([]);
  const [plan, setPlan] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    /*
    axios
      .get(`${PRODUCT_API_URL}${category}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${PLAN_API_URL}${category}`)
      .then((response) => {
        console.log(response.data);
        setPlan(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    */
    setProduct(SampleData);
    setPlan(SamplePlanData);
  }, []);

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListContents}>
        <div className={styles.ListTitle}>
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.ListOption}>
            <Option plan={plan} />
          </div>
          <div className={styles.ListItems}>
            <ProductList product={product} plan={plan} category={category} />
          </div>
          <div className={styles.RecentlyViewed}>
            {/* 최근 본 상품은 따로 처리 필요 */}
            <RecentlyViewed
              product={latestProduct}
              plans={plan}
              category={category}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
