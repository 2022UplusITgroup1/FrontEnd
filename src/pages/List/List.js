import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";
import axios from "axios";

const PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}net_sp=`;

function List({ category }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    /*
    axios
      .get(`${PRODUCT_API_URL}${category}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });*/
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
