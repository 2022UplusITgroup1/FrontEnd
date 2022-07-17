import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { Link } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import OrderPlanBox from "../../components/PlanBox/OrderPlanBox";
import SamplePlanData from "../../SamplePlanData.json";
import SampleDetailData from "../../SampleDetailData.json";
import axios from "axios";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import mapDiscountType from "../../utils/mapDiscountType";

// Detail 정보 & Plan 전체 정보 필요

function Detail() {
  //net_sp/:pl_code/:ph_code/:color/:dc_type
  const { net_sp, pl_code, ph_code, color, dc_type } = useParams();
  const DETAIL_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/detail?pl_code=${pl_code}&ph_code=${ph_code}&color=${color}&dc_type=${dc_type}`;
  const PLAN_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/plan?net_sp=`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 로 받아온 모바일 상품 상세 정보 & 요금제 정보
  const [data, setData] = useState(SampleDetailData);
  const [plans, setPlans] = useState(SamplePlanData);

  // 현재 사용자가 선택한 요금제 & 할인유형
  const [plan, setPlan] = useState([]);
  const [imgPaths, setImgPaths] = useState([]);
  const [planValue, setPlanValue] = useState(pl_code);
  const [discountValue, setDiscountValue] = useState(dc_type);

  const [prices, setPrices] = useState([]);
  const [nowPrice, setNowPrice] = useState([]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${DETAIL_URL}`);
      setData(response.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  const fetchPlan = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PLAN_API_URL}${net_sp}`);
      setPlan(response.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  useEffect(() => {
    console.log(planValue, discountValue);
    const nowPlan = findSelectPlan(planValue);
    setPlan(nowPlan);
    const nowPlanPrice = calcMonthPrice(
      data["phone"]["price"],
      nowPlan["price"]
    );
    setPrices(nowPlanPrice);
    console.log(nowPlanPrice);
    setNowPrice(calcDiscountPrice(discountValue, nowPlanPrice));
    console.log(calcDiscountPrice(discountValue, nowPlanPrice));
  }, [planValue, discountValue]);

  useEffect(() => {
    /* axios GET
    fetchProductDetail();
    fetchPlan(data["phone"]["networkSupport"]);
    */

    setImgPaths(
      data["images"].map((d) => {
        return d["imgPath"];
      })
    );

    const nowPlan = findSelectPlan(planValue);
    setPlan(nowPlan);
    const nowPlanPrice = calcMonthPrice(
      data["phone"]["price"],
      nowPlan["price"]
    );
    console.log(nowPlanPrice);
    setPrices(nowPlanPrice);
    setNowPrice(calcDiscountPrice(discountValue, nowPlanPrice));
  }, []);

  const [idx, setIdx] = useState(0);
  const [joinType, setJoinType] = useState("0");
  const onClickJoinType = (v) => {
    console.log(v);
    setJoinType(v);
  };

  const test = (e) => {
    setIdx(e.target.id);
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        <div className={styles.ProductImg}>
          <div className={styles.MainImg}>
            <img
              className={styles.MainImg}
              //src={imgUrls[Number(idx)]}
              src={data["images"][Number(idx)]["imgPath"]}
              alt={data["images"][Number(idx)]["imgPos"]}
            />
          </div>
          <div className={styles.PreviewImgs}>
            {imgPaths.map((url, i) => (
              <button className={styles.PreviewBtn} onClick={test} key={i}>
                <img
                  className={styles.PreviewImg}
                  src={url}
                  id={i}
                  alt="sub"
                  key={i}
                />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.ProductInfo}>
          <div className={styles.ProductName}>{data["phone"]["name"]}</div>
          <div className={styles.ProductColor}>
            <div className={styles.ProductColorTitleContainer}>
              <div className={styles.ProductColorTitle}>색상</div>
              <span>{data["phone"]["color"]}</span>
            </div>
            <div className={styles.ColorBtnContainer}>
              <div className={styles.ColorBtn}>
                <span
                  className={styles.ColorBtnInner}
                  style={{
                    backgroundColor: data["phone"]["color"],
                  }}
                ></span>
              </div>
            </div>
          </div>
          <div className={styles.Capacity}>
            <div className={styles.CapacityTitle}>저장공간</div>
            {/* 저장공간 선택 */}
            <button className={styles.CapacityBtn} value="1">
              {convertNumber(data["phone"]["storage"]["capability"])}GB
            </button>
          </div>
          <div>
            <br />
          </div>
          <div className={styles.JoinType}>
            <div className={styles.JoinTypeTitle}>가입유형</div>
            {/* 가입유형 선택 - radio */}
            <Stack direction="row">
              <button
                className={styles.JoinTypeBtn}
                style={{ borderColor: joinType === "0" ? "#000" : "#ddd" }}
                onClick={(e) => onClickJoinType("0")}
              >
                <span className={styles.RadioBtnSpan}>기기변경</span>
              </button>
              <button
                className={styles.JoinTypeBtn}
                style={{ borderColor: joinType === "1" ? "#000" : "#ddd" }}
                onClick={(e) => onClickJoinType("1")}
              >
                <span className={styles.RadioBtnSpan}>번호이동</span>
              </button>
              <button
                className={styles.JoinTypeBtn}
                style={{ borderColor: joinType === "2" ? "#000" : "#ddd" }}
                onClick={(e) => onClickJoinType("2")}
              >
                <span className={styles.RadioBtnSpan}>신규가입</span>
              </button>
            </Stack>
          </div>
          <div className={styles.PriceInfo}>
            <div className={styles.TotalPrice}>
              월 {nowPrice && convertNumber(Number(nowPrice.total))}원
            </div>
            <div className={styles.SubTitle}>
              {data["plan"]["name"]}, {mapDiscountType(Number(discountValue))}{" "}
              기준
            </div>
            <dl className={styles.PriceDetail}>
              <dt className={styles.PriceDetailDT}>휴대폰</dt>
              <dt className={styles.PriceDetailDD}>
                {convertNumber(Number(nowPrice.phone))} 원
              </dt>
              <dt className={styles.PriceDetailDT}>통신료</dt>
              <dt className={styles.PriceDetailDD}>
                {convertNumber(Number(nowPrice.plan))} 원
              </dt>
              <dt className={styles.PriceDetailDT}>정상가</dt>
              <dt className={styles.PriceDetailDD}>
                {prices.length !== 0 &&
                  convertNumber(Number(prices["original"]["total"]))}{" "}
                원
              </dt>
            </dl>
            {/* 가격 정보 - dl & dt */}
          </div>
          <div className={styles.InfoBtn}>
            {/* 온라인 주문 버튼 */}
            <Link to="/order">
              <button className={styles.OrderBtn}>온라인 주문</button>
            </Link>
          </div>
        </div>
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
                      <div className={styles.OrderInfoTdTitle}>추천 요금제</div>
                      <div className={styles.OrderInfoTdBtn}>
                        다른 요금제 선택 ❯
                      </div>
                    </div>
                    <OrderPlanBox data={SamplePlanData} />
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
                        <div className={styles.OrderInfoTdBtn}>
                          자세히 보기 ❯
                        </div>
                      </div>
                      <div className={styles.OrderInfoTdBody}></div>
                    </div>
                    <div className={styles.OrderInfoTdItem}>
                      <div className={styles.OrderInfoTdHeader}>
                        <div className={styles.OrderInfoTdTitle}>할부기간</div>
                      </div>
                      <div className={styles.OrderInfoTdBody}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.ProductDetail}>
          {/* 상품 정보 컴포넌트 */}
          {/*<ProductDetail product={SampleDetailData} /> */}
        </div>
      </div>
    </div>
  );
}

export default Detail;

/*
  const imgUrls = [
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-107-EpOJVZKV.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-105-5XFcEWAn.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-123-xI98LvJp.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-105-6upl4lWx.jpg",
  ];
*/
