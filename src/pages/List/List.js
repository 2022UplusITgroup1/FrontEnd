// 상품 리스트 페이지

import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import Option from "../../components/Option/Option";
import ProductList from "../../components/ProductList/ProductList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import { resetDetailData, resetOptionData } from "../../actions";
import NoResult from "../Exception/NoResult";
import ErrorPage from "../Exception/ErrorPage";

// API URI
const SERVER_API_URI = `http://43.200.122.174:8000`;
const PRODUCTS_API_URI = SERVER_API_URI + `/product/phone?net_sp=`;
const PLANS_API_URI = SERVER_API_URI + `/product/plan?net_sp=`;
const RECENT_PRODUCT_API_URI = SERVER_API_URI + `/product/recents`;

//const PRODUCTS_API_URI = `/product/phone?net_sp=`;
//const PLANS_API_URI = `/product/plan?net_sp=`;
//const RECENT_PRODUCT_API_URI = `/product/recents`;

function List({ netType }) {
  const dispatch = useDispatch();
  //console.log(netType);

  // API 로 받아온 상품, 요금제, 최근 본 상품
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [recentlyProducts, setRecentlyProducts] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  // GET 상품 전체 리스트
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      setNoData(false);
      const response = await axios.get(`${PRODUCTS_API_URI}${netType}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("getProducts SUCCESS ");
        // color 가 다른 기종은 맨 처음 값만 가져오도록
        const res = response.data.data;
        let filteredRes = res.filter((item, i) => {
          return (
            res.findIndex((item2, j) => {
              return item.code === item2.code;
            }) === i
          );
        });
        setProducts(filteredRes);
        //console.log("전체 조회");
        //console.log(filteredRes);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setNoData(true);
      }
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
      setNoData(false);
      const response = await axios.get(`${PLANS_API_URI}${netType}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("getPlans SUCCESS ");
        setPlans(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setNoData(true);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 데이터 가져오기
    getProducts();
    getPlans();
    // getRecents();
    //setRecentlyProducts(SampleRecentlyData);
    dispatch(resetOptionData()); // 5G - 4G 간 페이지 이동 시, 선택했던 option 값 초기화
    dispatch(resetDetailData()); // 상세페이지에서 뒤로가기 시, 선택했던 detail 값 초기화
  }, [netType]);

  if (loading) return <div></div>;
  //if (error) return <ErrorPage />;
  if (noData) return <NoResult />;
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
          {/* 상품 전체 리스트 조건 div */}
          <div className={styles.ListOption}>
            {/* 옵션 아코디언 */}
            {plans.length ? <Option plans={plans} /> : null}
          </div>
          <div className={styles.ListItems}>
            {/* 상품 리스트 섹션 */}
            {products.length && plans.length ? (
              <ProductList
                products={products}
                plans={plans}
                netType={netType}
              />
            ) : null}
          </div>
          <div className={styles.RecentlyViewed}>
            {/* 최근 본 상품 */}
            {products.length && plans.length ? (
              <RecentlyViewed
                products={products}
                plans={plans}
                category={netType}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
