// 상품 상세 페이지

import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import {
  changeDetailPlanType,
  selectDetail,
  setRecentlyProduct,
} from "../../actions";
import ModalPlanBox from "../../components/PlanBox/ModalPlanBox";
import PlanDetail from "../../components/ProductDetail/PlanDetail";
import DiscountDetail from "../../components/ProductDetail/DiscountDetail";
import PayPeriodDetail from "../../components/ProductDetail/PayPeriodDetail";
import ImgDetail from "../../components/ProductDetail/ImgDetail";
import InfoDetail from "../../components/ProductDetail/InfoDetail";
import calcPrices from "../../utils/calcPrices";
import NoResult from "../Exception/NoResult";
import ErrorPage from "../Exception/ErrorPage";
import { useCookies } from 'react-cookie';

// Detail 정보 & Color 정보 & Plan 전체 정보 필요

// Detail Product 초기화 값
const initialDetail = {
  phone: {
    storage: {
      capability: 0,
    },
    brand: {
      name: "",
    },
    code: "",
    name: "",
    imgThumbnail: "",
    networkSupport: "",
    discountType: "",
    color: "",
    price: "",
    sales: "",
  },
  plan: {
    code: "",
    name: "",
    networkSupport: "",
    data: "",
    message: "",
    voice: "",
    price: "",
    shareData: "",
  },
  images: [
    {
      imgPath: "",
      imgName: "",
      imgPos: "",
    },
  ],
};

// nowPrice 결제 금액 초기화 값
const initialPrice = {
  discountName: "",
  phonePrice: 0,
  planPrice: 0,
  publicPrice: 0,
  selectPrice: 0,
  monthPhonePrice: 0,
  monthPlanPrice: 0,
  realPhonePrice: 0,
  total: 0,
};

const IMAGE_URI = `${process.env.REACT_APP_IMAGE_URI}`;

function Detail() {
  // 받아온 파라미터 데이터
  const { netType, plCode, phCode, color, dcType } = useParams();
  console.log(netType, plCode, phCode, color, dcType);

  // API URI
  const PRODUCT_DETAIL_URI = `/product/detail?pl_code=${plCode}&ph_code=${phCode}&color=${color}&dc_type=${dcType}`;
  const PRODUCT_COLOR_URI = `/product/color?ph_code=${phCode}`;
  const PLAN_URI = `/product/plan?net_sp=`;

  //const PRODUCT_DETAIL_URI = `/product/detail?pl_code=${plCode}&ph_code=${phCode}&color=${color}&dc_type=${dcType}`;
  //const PRODUCT_COLOR_URI = `/product/color?ph_code=${phCode}`;
  //const PLAN_URI = `/product/plan?net_sp=`;

  const dispatch = useDispatch();

  // session id
  const [cookies] = useCookies(['JSESSIONID']);
  console.log(cookies.JSESSIONID);

  // 요금제 모달
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 데이터 에러 처리
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  // API 로 받아온 모바일 상품 상세 정보 & 요금제 정보
  const [data, setData] = useState(initialDetail);
  const [imgPaths, setImgPaths] = useState([]);
  const [colors, setColors] = useState([]);
  const [plans, setPlans] = useState([]);

  // 현재 요금제 정보
  const [plan, setPlan] = useState(initialDetail.plan);

  // 현재 요금제 + 할인 유형을 바탕으로 한 가격
  const [nowPrice, setNowPrice] = useState(initialPrice);

  // 현재 사용자가 선택한 주문 정보가 담긴 Store
  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // Redux Dispatch -> 주문 정보 저장
  const onSelectDetail = (nowPlan, nowTotalPrice) => {
    const value = {
      phone: {
        code: data.phone.code,
        name: data.phone.name,
        imgThumbnail: IMAGE_URI + data.phone.imgThumbnail,
        storage: { capability: data.phone.storage.capability },
        color: color, // 초기값 = color
        price: data.phone.price,
      },
      plan: {
        code: nowPlan.code,
        name: nowPlan.name,
        price: nowPlan.price,
      },
      discountType: dcType, // 초기값 = dcType
      monthPrice: nowTotalPrice.total,
      payPeriod: dcType === "3" ? 12 : 24, // 계약기간 => 기본 = 24, 선택약정12개월 = 12
    };
    dispatch(selectDetail(value));
  };

  // API: 상품 리스트 GET
  const fetchProductDetail = async () => {
    try {
      setError(null);
      setNoData(false);
      const response = await axios.get(`${PRODUCT_DETAIL_URI}`);
      console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchProductDetail SUCCESS ");
        setData(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setNoData(true);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // API: 상품 색상 리스트 GET
  const fetchProductColor = async () => {
    try {
      setError(null);
      setNoData(false);
      const response = await axios.get(`${PRODUCT_COLOR_URI}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchProductColor SUCCESS ");
        setColors(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setNoData(true);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // API: 요금제 리스트 GET
  const fetchPlans = async () => {
    try {
      setError(null);
      setNoData(false);
      const response = await axios.get(`${PLAN_URI}${netType}`);
      //console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchPlans SUCCESS ");
        setPlans(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        setNoData(true);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // API: 다른 색상의 이미지 GET
  const fetchProductColorImg = async (nowColor) => {
    console.log(nowColor);
    try {
      setError(null);
      setNoData(false);

      const PRODUCT_COLOR_IMG_URI = `/product/detail?pl_code=${plCode}&ph_code=${phCode}&color=${nowColor}&dc_type=${dcType}`;

      const response = await axios.get(`${PRODUCT_COLOR_IMG_URI}`);
      console.log(response.data);
      if (response.data.data !== null) {
        console.log("fetchProductColorImg SUCCESS ");
        const resImg = response.data.data.images;
        setImgPaths(
          resImg.map((d) => {
            return `${IMAGE_URI}${d.imgPath}${d.imgName}`;
          })
        );
      } else {
        // 알맞은 결과를 찾을 수 없습니다
        //setNoData(true);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  // 초기 세팅
  useEffect(() => {
    fetchProductDetail();
    fetchProductColor();
    fetchPlans();
  }, []);

  // 상세 페이지로 넘어온 파라미터를 기준으로 계산해서 Store 에 저장
  useEffect(() => {
    // orderProduct 도 고려하는 이유 => 뒤로가기 했을 때 유지하기 위해
    // TODO: 새창으로 뜨도록하고 유지하지 말기
    if (
      data.phone.code !== "" &&
      plans.length &&
      orderProduct.phone.code === ""
    ) {
      // 미리보기 이미지 list 로 저장
      setImgPaths(
        data.images.map((d) => {
          return `${IMAGE_URI}${d.imgPath}${d.imgName}`;
        })
      );

      // 현재 요금제 기반 계산
      const nowPlan = findSelectPlan(plCode);
      setPlan(nowPlan);

      // 계약기간 => 기본 = 24, 선택약정12개월 = 12
      let payPeriod = dcType === "3" ? 12 : 24;
      const nowTotalPrice = calcPrices(
        data.phone.price,
        data.plan.price,
        dcType,
        payPeriod
      );
      setNowPrice(nowTotalPrice);
      // Redux 변경
      onSelectDetail(nowPlan, nowTotalPrice);
    }
  }, [data, plans]);

  // 요금제 변경 시 plan 변경
  useEffect(() => {
    setPlan(orderProduct.plan);
  }, [orderProduct]);

  // 선택된 색상 변경 시, imgPath 도 변경
  useEffect(() => {
    if (orderProduct.phone.color) {
      fetchProductColorImg(orderProduct.phone.color);
    }
  }, [orderProduct.phone.color]);

  /* ----- MYSEO CREATED ----- */
  // MYSEO CREATED - 최근 본 상품 LocalStorage 저장
  const [firstRender, setfirstRender] = useState(1); // 맨 처음에만 저장되도록

  useEffect(() => {
    if (data.phone.code && colors.length && firstRender) {
      let recentsItemInfo = {
        jSessionId: cookies.JSESSIONID,
        code: data.phone.code,
        name: data.phone.name,
        color: data.phone.color,

        imgThumbnail: IMAGE_URI + data.phone.imgThumbnail,

        plan: plCode,
        networkSupport: data.phone.networkSupport,
        discountType: data.phone.discountType,
        imgThumbnail: data.phone.imgThumbnail,
        totalPrice: nowPrice.total,
      };
      let watchItem = localStorage.getItem("recents");

      let watchItemArray = [];
      if (watchItem != null) {
        watchItemArray = JSON.parse(watchItem);
      }
      watchItemArray.push(recentsItemInfo);

      let setItems = new Set(watchItemArray);
      let setWatchItemArray = [...setItems];

      localStorage.setItem("recents", JSON.stringify(setWatchItemArray));

      setfirstRender(0);
    }
  }, [data]);
  /* ----- END ----- */

  if (error) return <ErrorPage />;
  if (noData) return <NoResult />;
  if (!data) return null;
  if (!plans) return null;
  if (!colors) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        {/* 상품 이미지 섹션 */}
        {data.phone.code && <ImgDetail data={data} imgPaths={imgPaths} />}
        {/* 상품 정보 섹션 */}
        {data.phone.code && plan.code && colors.length && (
          <InfoDetail data={data} plan={orderProduct.plan} colors={colors} />
        )}
      </div>
      <div className={styles.OrderDetail}>
        <div className={styles.OrderInfo}>
          <div className={styles.OrderInfoTitle}>주문 상세</div>
          {/* 주문 상세 - table */}
          <div className={styles.OrderInfoTableContainer}>
            <table className={styles.OrderInfoTable}>
              <tbody className={styles.OrderInfoTbody}>
                <tr className={styles.OrderInfoTr}>
                  <th className={styles.OrderInfoTh}>요금제</th>
                  <td className={styles.OrderInfoTd}>
                    <div className={styles.OrderInfoTdHeader}>
                      <div className={styles.OrderInfoTdTitle}>현재 요금제</div>
                      <div className={styles.OrderInfoTdBtn} onClick={onOpen}>
                        다른 요금제 선택 ❯
                      </div>
                    </div>
                    {/* 현재 요금제 Box */}
                    {orderProduct.plan.code && (
                      <PlanDetail
                        plan={findSelectPlan(orderProduct.plan.code)}
                      />
                    )}
                  </td>
                </tr>
                <tr className={styles.OrderInfoTr}>
                  <th className={styles.OrderInfoTh}>
                    <div className={styles.OrderInfoThTitle}>
                      할인유형
                      <br />
                      할부기간
                    </div>
                    <div className={styles.OrderInfoThDetail}>
                      할인유형과 할부기간을 선택해주세요.
                    </div>
                  </th>
                  <td className={styles.OrderInfoTd}>
                    <div className={styles.OrderInfoTdItem}>
                      <div className={styles.OrderInfoTdHeader}>
                        <div className={styles.OrderInfoTdTitle}>할인 유형</div>
                      </div>
                      <div className={styles.OrderInfoTdBody}>
                        {/* 할인 유형 Select Box */}
                        {data.phone.code && plan.code && (
                          <DiscountDetail data={data} plan={plan} />
                        )}
                      </div>
                    </div>
                    <div className={styles.OrderInfoTdItem}>
                      <div className={styles.OrderInfoTdHeader}>
                        <div className={styles.OrderInfoTdTitle}>할부기간</div>
                      </div>
                      <div className={styles.OrderInfoTdBody}>
                        {/* 할부기간 Select Box */}
                        {data.phone.code && plan.code && (
                          <PayPeriodDetail data={data} plan={plan} />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.ProductDetail}>
          {/* 상품 정보 컴포넌트 */}
          {data.phone.code && <ProductDetail data={data} />}
        </div>
      </div>

      {/* 요금제 더보기 모달 */}
      {isOpen && (
        <ModalPlanBox
          isOpen={isOpen}
          onClose={onClose}
          plans={plans}
          planType={orderProduct.plan.code}
          actionFunc={changeDetailPlanType}
        />
      )}
    </div>
  );
}

export default Detail;
