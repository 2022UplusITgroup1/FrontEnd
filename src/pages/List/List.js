import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";
import axios from "axios";

const PRODUCT_API_URL = `http://52.78.238.139:8000/product/phone?net_sp=`;
// http://52.78.238.139:54421/order/my?name=%EC%95%84%EC%9D%B4%EC%9C%A0&phone_number=01012340001&order_number=202207132210570001

function List({ category }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(PRODUCT_API_URL);
    axios
      .get(`${PRODUCT_API_URL}${category}`, {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.Contents}>
        <div className={styles.Title}>
          <h2>{category} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.Options}>
            <Option data={SamplePlanData} />
          </div>
          <div className={styles.ItemList}>
            <ProductList data={SampleData} />
          </div>
          <div className={styles.RecentlyViewed}>
            <RecentlyViewed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
