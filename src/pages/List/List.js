// 상품 리스트 페이지

import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";
import SampleRecentlyData from "../../SampleRecentlyData.json";
import Compare from "../../components/Compare/Compare";
import { useParams } from "react-router-dom";

// API URI
//const PRODUCTS_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/product?net_sp=`;
//const PLANS_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/plan?net_sp=`;
//const RECENT_PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVER_URL}/recents`;

const PRODUCTS_API_URL = `http://localhost:8000/product/phone?net_sp=`;
const PLANS_API_URL = `http://localhost:8000/product/plan?net_sp=`;
const RECENT_PRODUCT_API_URL = `http://localhost:8000/recents`;

function List({ netType }) {
  //console.log(netType);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [recentlyProducts, setRecentlyProducts] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET 상품 전체 리스트
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PRODUCTS_API_URL}${netType}`);
      console.log("getProducts SUCCESS ");
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // GET 요금제 전체 리스트
  const getPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PLANS_API_URL}${netType}`);
      console.log("getPlans SUCCESS ");
      setPlans(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // GET 최근 본 상품 전체 리스트
  const getRecents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${RECENT_PRODUCT_API_URL}`);
      console.log("getRecents SUCCESS ");
      setRecentlyProducts(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("list First Rendering");
    // 데이터 가져오기
    axios
      .all([
        axios.get(`${PRODUCTS_API_URL}${netType}`),
        axios.get(`${PLANS_API_URL}${netType}`),
        //axios.get(`${RECENT_PRODUCT_API_URL}`),
      ])
      .then(
        axios.spread((res1, res2) => {
          setProducts(res1.data.data);
          setPlans(res2.data.data);
          //setRecentlyProducts(res3.data.data);
        })
      )
      .catch((e) => {
        console.log(e);
        setError(e);
      });
    //getProducts();
    //getPlans();
    // getRecents();
    //setProducts(SampleData);
    //setPlans(SamplePlanData);
    setRecentlyProducts(SampleRecentlyData);
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;
  if (!products) return null;
  if (!plans) return null;

  return (
    <div className={styles.ListContainer}>
      <div className={styles.ListContents}>
        <div className={styles.ListTitle}>
          {/* 페이지 타이틀 */}
          <h2>{netType} 휴대폰</h2>
        </div>
        <div className={styles.List}>
          <div className={styles.ListOption}>
            {/* 옵션 아코디언 */}
            <Option plans={plans} />
          </div>
          <div className={styles.ListItems}>
            {/* 상품 리스트 섹션 */}
            <ProductList products={products} plans={plans} category={netType} />
          </div>
          <div className={styles.RecentlyViewed}>
            {/* 최근 본 상품 */}
            <RecentlyViewed
              products={products}
              plans={plans}
              category={netType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
