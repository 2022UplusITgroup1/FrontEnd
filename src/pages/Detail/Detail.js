// 상품 상세 페이지

import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
//import OrderPlanBox from "../../components/PlanBox/OrderPlanBox";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import mapDiscountType from "../../utils/mapDiscountType";
import floorNumber from "../../utils/floorNumber";
import SamplePlanData from "../../SamplePlanData.json";
import SampleDetailData from "../../SampleDetailData.json";
import SampleColorData from "../../SampleColorData.json";
import { selectDetail, setRecentlyProduct } from "../../actions";

// Detail 정보 & Plan 전체 정보 필요

function Detail() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 받아온 파라미터 데이터
  const { netType, plCode, phCode, color, dcType } = useParams();

  // API URL
  const PRODUCT_DETAIL_URL = `http://43.200.122.174:8000/product/detail?pl_code=${plCode}&ph_code=${phCode}&color=${color}&dc_type=${dcType}`;
  const PRODUCT_COLOR_URL = `http://43.200.122.174:8000/product/color?ph_code=${phCode}`;
  const PLAN_URL = `http://43.200.122.174:8000/product/plan?net_sp=`;

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 로 받아온 모바일 상품 상세 정보 & 요금제 정보
  const [data, setData] = useState(SampleDetailData);
  const [colors, setColors] = useState(SampleColorData);
  const [plans, setPlans] = useState(SamplePlanData);

  // 현재 사용자가 선택한 요금제 & 할인유형
  const [plan, setPlan] = useState([]); // 현재 요금제 정보
  const [imgPaths, setImgPaths] = useState([]);
  const [planValue, setPlanValue] = useState(plCode);
  const [planModalValue, setPlanModalValue] = useState(plCode);
  const [discountValue, setDiscountValue] = useState(dcType);
  const [sortValue, setSortValue] = useState("0");
  const [colorType, setColorType] = useState(color);
  const [payPeriod, setPayPeriod] = useState(12);

  // Redux Dispatch -> 주문 정보 저장
  const onSelectDetail = (nowPlan, nowPlanPrice) => {
    const value = {
      phone: {
        code: data.phone.code,
        name: data.phone.name,
        imgThumbnail: data.phone.imgThumbnail,
        storage: data.phone.storage.capability,
        color: colorType,
        price: data.phone.price,
      },
      plan: {
        code: nowPlan.code,
        name: nowPlan.name,
        price: nowPlan.price,
      },
      discountType: discountValue,
      monthPrice: calcDiscountPrice(discountValue, nowPlanPrice).total,
      payPeriod: payPeriod,
    };
    dispatch(selectDetail(value));
  };

  // 모달을 통한 요금제 변경 함수
  const onApplyPlan = () => {
    setPlanValue(planModalValue);
    onClose();
  };

  // API: 상품 리스트 GET
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PRODUCT_DETAIL_URL}`);
      console.log("fetchProductDetail SUCCESS ");
      setData(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // API: 상품 색상 리스트 GET
  const fetchProductColor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PRODUCT_COLOR_URL}`);
      console.log("fetchProductColor SUCCESS ");
      setColors(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // API: 요금제 리스트 GET
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${PLAN_URL}${netType}`);
      console.log("fetchPlans SUCCESS ");
      setPlans(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // 현재 요금제 정보 찾기
  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  // 현재 요금제 + 할인 유형을 바탕으로 한 가격
  const [prices, setPrices] = useState([]);
  const [nowPrice, setNowPrice] = useState([]);

  // 이미지 클릭 시, index 변경 함수
  const [idx, setIdx] = useState(0);
  const onChangeImg = (e) => {
    setIdx(e.target.id);
  };

  // 할인 유형 변경
  const onChangeDiscountValue = (value) => {
    setDiscountValue(value);
  };

  // 초기 세팅
  useEffect(() => {
    //fetchProductDetail();
    fetchProductColor();
    fetchPlans();
    setData(SampleDetailData);
    //setPlans(SamplePlanData);
    //setColors(SampleColorData);
  }, []);

  // 초기 세팅 후, 전달받은 상품과 요금제 데이터를 기반으로 초기화
  useEffect(() => {
    // 미리보기 이미지 list 로 저장
    setImgPaths(
      data["images"].map((d) => {
        return d["imgPath"];
      })
    );

    // 현재 선택된 요금제 정보 추출
    const nowPlan = findSelectPlan(planValue);
    setPlan(nowPlan);
    const nowPlanPrice = calcMonthPrice(
      data["phone"]["price"],
      nowPlan["price"],
      payPeriod
    );
    setPrices(nowPlanPrice);
    const nowTotalPrice = calcDiscountPrice(discountValue, nowPlanPrice);
    setNowPrice(nowTotalPrice);
    // Redux 변경
    onSelectDetail(nowPlan, nowPlanPrice);

    // 최근 본 상품 정보 넘기기 -> 처음 접근한 정보값 기준
    const recentInfo = {
      phoneCode: phCode,
      phoneName: data.phone.name,
      phoneColor: color,
      imgThumbnail: data.phone.imgThumbnail,
      planCode: plCode,
      networkSupport: netType,
      discountType: dcType,
      monthPrice: nowTotalPrice.total,
    };
    dispatch(setRecentlyProduct(recentInfo));
  }, [data, plans, color]);

  // 요금제 & 할인유형 변할 때마다 새로운 정보로 update
  useEffect(() => {
    console.log(planValue, discountValue, payPeriod);
    const nowPlan = findSelectPlan(planValue);
    setPlan(nowPlan);
    const nowPlanPrice = calcMonthPrice(
      data["phone"]["price"],
      nowPlan["price"],
      payPeriod
    );
    setPrices(nowPlanPrice);
    setNowPrice(calcDiscountPrice(discountValue, nowPlanPrice));
    // Redux 변경
    onSelectDetail(nowPlan, nowPlanPrice);
  }, [planValue, discountValue, payPeriod, colorType]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return null;
  if (!plans) return null;
  if (!color) return null;

  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        <div className={styles.ProductImg}>
          <div className={styles.MainImg}>
            <img
              className={styles.MainImg}
              src={data["images"][Number(idx)]["imgPath"]}
              alt={data["images"][Number(idx)]["imgPos"]}
            />
          </div>
          <div className={styles.PreviewImgs}>
            {imgPaths.map((url, i) => (
              <button
                className={styles.PreviewBtn}
                onClick={onChangeImg}
                key={i}
              >
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
              <span>{colorType}</span>
            </div>
            <div className={styles.ColorBtnContainer}>
              {colors.map((color) => {
                return (
                  <button
                    className={styles.ColorBtn}
                    key={color}
                    value={color}
                    onClick={(e) => setColorType(color)}
                    style={{
                      borderColor: colorType === color ? "#000" : "#909090",
                    }}
                  >
                    <span
                      className={styles.ColorBtnInner}
                      style={{
                        backgroundColor: color,
                      }}
                    ></span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.Capacity}>
            <div className={styles.CapacityTitle}>저장공간</div>
            <button className={styles.ItemBtn} value="1">
              {convertNumber(data["phone"]["storage"]["capability"])}GB
            </button>
          </div>
          <div>
            <br />
          </div>
          <div className={styles.JoinType}>
            <div className={styles.JoinTypeTitle}>가입유형</div>
            <button className={styles.ItemBtn} value="1">
              신규가입
            </button>
          </div>
          <div className={styles.PriceInfo}>
            <div className={styles.TotalPrice}>
              월 {nowPrice && convertNumber(Number(nowPrice.total))}원
            </div>
            <div className={styles.SubTitle}>
              {plan.name}, {mapDiscountType(Number(discountValue))} 기준
            </div>
            <dl className={styles.PriceDetail}>
              <dt className={styles.PriceDetailDT}>휴대폰</dt>
              <dd className={styles.PriceDetailDD}>
                {convertNumber(Number(nowPrice.phone))} 원
              </dd>
              <dt className={styles.PriceDetailDT}>통신료</dt>
              <dd className={styles.PriceDetailDD}>
                {convertNumber(Number(nowPrice.plan))} 원
              </dd>
              <dt className={styles.PriceDetailDT}>정상가</dt>
              <dd className={styles.PriceDetailDD}>
                {prices.length !== 0 &&
                  convertNumber(Number(data["phone"]["price"]))}{" "}
                원
              </dd>
            </dl>
            {/* 가격 정보 - dl & dt */}
          </div>
          <div className={styles.InfoBtn}>
            {/* 온라인 주문 버튼 */}
            <Link to="/mobile/order">
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
                      <div className={styles.OrderInfoTdTitle}>현재 요금제</div>
                      <div className={styles.OrderInfoTdBtn} onClick={onOpen}>
                        다른 요금제 선택 ❯
                      </div>
                    </div>
                    {/*<OrderPlanBox data={SamplePlanData} />*/}
                    <Stack className={styles.OrderPlanContainerStack}>
                      <div className={styles.OrderPlanItemContainer}>
                        <div className={styles.OrderPlanInfoContainer}>
                          {/*createPlanPreview(plans, onPlanValueChange)*/}
                          <div
                            className={styles.OrderPlanItem}
                            value={plan.code}
                            size="lg"
                          >
                            <div className={styles.OrderPlanInfo}>
                              <div className={styles.OrderPlanMain}>
                                <div className={styles.OrderPlanName}>
                                  {plan.name}
                                </div>
                                <div className={styles.OrderPlanPrice}>
                                  {convertNumber(Number(plan.price))}원
                                </div>
                              </div>

                              <div className={styles.OrderPlanDetail}>
                                <div className={styles.OrderPlanDetailItem}>
                                  {convertNumber(Number(plan.data))}GB
                                  <div className={styles.OrderPlanDetailHeader}>
                                    데이터
                                  </div>
                                </div>
                                <div className={styles.OrderPlanDetailItem}>
                                  {convertNumber(Number(plan.shareData))}GB
                                  <div className={styles.OrderPlanDetailHeader}>
                                    나눠쓰기
                                  </div>
                                </div>
                                <div className={styles.OrderPlanDetailItem}>
                                  {convertNumber(Number(plan.voice))}분
                                  <div className={styles.OrderPlanDetailHeader}>
                                    음성통화
                                  </div>
                                </div>
                                <div className={styles.OrderPlanDetailItem}>
                                  {convertNumber(Number(plan.message))}건
                                  <div className={styles.OrderPlanDetailHeader}>
                                    메세지
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Stack>
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
                        {/*<div className={styles.OrderInfoTdBtn}>
                          자세히 보기 ❯
                </div>*/}
                      </div>
                      <div className={styles.OrderInfoTdBody}>
                        <RadioGroup
                          onChange={onChangeDiscountValue}
                          value={discountValue}
                          className={styles.OrderInfoTdInner}
                        >
                          <div
                            className={styles.OrderInfoTdLeftContainer}
                            style={{
                              borderColor:
                                discountValue === "1" ? "#000" : "#ddd",
                              color: discountValue === "1" ? "#000" : "#666",
                            }}
                          >
                            <Radio
                              opacity={0}
                              value="1"
                              onClick={(e) => setDiscountValue("1")}
                            >
                              <div className={styles.OrderInfoTdLeft}>
                                {/* 공시지원금 */}
                                <div>
                                  <div className={styles.DiscountTypeTitle}>
                                    공시지원금
                                  </div>
                                  <div>휴대폰 가격 1회 할인</div>
                                </div>
                                <div className={styles.PublicPrice}>
                                  총 -
                                  {convertNumber(
                                    Number(data["phone"]["price"] * 0.3)
                                  )}{" "}
                                  원
                                </div>
                              </div>
                            </Radio>
                          </div>
                          <div
                            className={styles.OrderInfoTdRightContainer}
                            style={{
                              borderColor:
                                discountValue !== "1" ? "#000" : "#ddd",
                              color: discountValue !== "1" ? "#000" : "#666",
                            }}
                          >
                            <div className={styles.OrderInfoTdRight}>
                              {/* 선택약정할인 */}
                              <div className={styles.DiscountTypeTitle}>
                                선택약정할인
                              </div>
                              <div>통신요금 25% 할인</div>
                              <div className={styles.SelectPlan}>
                                <Radio value="2" size="lg">
                                  24개월 할인
                                </Radio>
                                <span className={styles.SelectPlanPrice}>
                                  총 -
                                  {convertNumber(
                                    Number(plan.price * 24 * 0.25)
                                  )}{" "}
                                  원
                                </span>
                              </div>
                              <div className={styles.SelectPlan}>
                                <Radio value="3" size="lg">
                                  12개월 할인
                                </Radio>
                                <span className={styles.SelectPlanPrice}>
                                  총 -
                                  {convertNumber(
                                    Number(plan.price * 12 * 0.25)
                                  )}{" "}
                                  원
                                </span>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className={styles.OrderInfoTdItem}>
                      <div className={styles.OrderInfoTdHeader}>
                        <div className={styles.OrderInfoTdTitle}>할부기간</div>
                      </div>
                      <div className={styles.OrderInfoTdBody}>
                        <div className={styles.PayPeriodContainer}>
                          <button
                            className={styles.PayPeriod}
                            onClick={(e) => setPayPeriod(1)}
                            style={{
                              borderColor: payPeriod === 1 ? "#000" : "#ddd",
                              color: payPeriod === 1 ? "#000" : "#666",
                            }}
                          >
                            카드/간편결제
                            <div>(일시불/할부)</div>
                          </button>
                          <button
                            className={styles.PayPeriod}
                            onClick={(e) => setPayPeriod(12)}
                            style={{
                              borderColor: payPeriod === 12 ? "#000" : "#ddd",
                              color: payPeriod === 12 ? "#000" : "#666",
                            }}
                          >
                            12개월
                          </button>
                          <button
                            className={styles.PayPeriod}
                            onClick={(e) => setPayPeriod(24)}
                            style={{
                              borderColor: payPeriod === 24 ? "#000" : "#ddd",
                              color: payPeriod === 24 ? "#000" : "#666",
                            }}
                          >
                            24개월
                          </button>
                          <button
                            className={styles.PayPeriod}
                            onClick={(e) => setPayPeriod(36)}
                            style={{
                              borderColor: payPeriod === 36 ? "#000" : "#ddd",
                              color: payPeriod === 36 ? "#000" : "#666",
                            }}
                          >
                            36개월
                          </button>
                        </div>
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
          <ProductDetail product={SampleDetailData} />
        </div>
      </div>

      {/* 요금제 더보기 모달 */}
      <Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className={styles.ModalContent}>
          <ModalHeader className={styles.ModalHeader}>전체 요금제</ModalHeader>
          <ModalCloseButton />
          <div className={styles.HeaderMenu}>
            <div className={styles.HeaderSortContainer}>
              <div className={styles.HeaderSelectSort}>
                <Select value={sortValue} onChange={setSortValue}>
                  <option value="0">많은 데이터 사용량 순</option>
                  <option value="1">적은 데이터 사용량 순</option>
                  <option value="2">높은 가격 순</option>
                  <option value="3">낮은 가격 순</option>
                </Select>
              </div>
            </div>
            <div className={styles.HeaderMenuNav}>
              <div className={styles.HeaderLeftMenu}>
                <div className={styles.NavItem}>요금제</div>
              </div>
              <div className={styles.HeaderRightMenu}>
                <div className={styles.NavItem}>데이터</div>
                <div className={styles.NavItem}>나눠쓰기</div>
                <div className={styles.NavItem}>음성통화</div>
                <div className={styles.NavItem}>메세지</div>
              </div>
            </div>
          </div>
          <ModalBody className={styles.ModalBody}>
            <RadioGroup
              onChange={setPlanModalValue}
              value={planModalValue}
              className={styles.PlanContainer}
            >
              <Stack className={styles.PlanContainerStack}>
                {plans.map((p, i) => {
                  return (
                    <div className={styles.PlanItemContainer} key={i}>
                      <div className={styles.PlanInfoContainer} key={i}>
                        <Radio
                          className={styles.PlanItem}
                          value={p.code}
                          size="lg"
                        >
                          <div className={styles.PlanInfo}>
                            <div className={styles.PlanMain}>
                              <div className={styles.PlanName}>{p.name}</div>
                              <div className={styles.PlanPrice}>
                                {convertNumber(p.price)}원
                              </div>
                            </div>

                            <div className={styles.PlanDetail}>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.data)}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.shareData)}GB
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.voice)}분
                              </div>
                              <div className={styles.PlanDetailItem}>
                                {convertNumber(p.message)}건
                              </div>
                            </div>
                          </div>
                        </Radio>
                      </div>
                    </div>
                  );
                })}
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter className={styles.ModalFooter}>
            <div className={styles.FooterInfo}>
              <ul className={styles.FooterInfoUL}>
                <li className={styles.FooterInfoLI}>
                  • 정액은 부가세 포함 금액입니다.
                </li>
                <li className={styles.FooterInfoLI}>
                  • 안내된 요금제 외 가입 가능한 요금제는 별도 상담을 통해 안내
                  받으실 수 있습니다.
                </li>
              </ul>
            </div>
            <div className={styles.FooterBtnContainer}>
              <Button onClick={onClose} className={styles.FooterCancelBtn}>
                취소
              </Button>
              <Button onClick={onApplyPlan} className={styles.FooterApplyBtn}>
                적용
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Detail;
