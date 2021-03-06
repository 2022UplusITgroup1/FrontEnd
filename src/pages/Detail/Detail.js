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
import { useParams } from "react-router-dom";
//import OrderPlanBox from "../../components/PlanBox/OrderPlanBox";
import SamplePlanData from "../../SamplePlanData.json";
import SampleDetailData from "../../SampleDetailData.json";
import axios from "axios";
import convertNumber from "../../utils/convertNumber";
import calcMonthPrice from "../../utils/calcMonthPrice";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import mapDiscountType from "../../utils/mapDiscountType";

// Detail 정보 & Plan 전체 정보 필요

// 미리보기 요금제 만들기
const createPlanPreview = (data, onPlanValueChange) => {
  const planPreviewList = [];
  let len = 3;
  if (data.length < 3) len = data.length;
  for (let i = 0; i < len; i++) {
    planPreviewList.push(
      <div
        className={styles.OrderPlanItem}
        value={i}
        key={i}
        size="lg"
        onClick={onPlanValueChange}
      >
        <div className={styles.OrderPlanInfo}>
          <div className={styles.OrderPlanMain}>
            <div className={styles.OrderPlanName}>{data[i].name}</div>
            <div className={styles.OrderPlanPrice}>
              {convertNumber(data[i].price)}원
            </div>
          </div>

          <div className={styles.OrderPlanDetail}>
            <div className={styles.OrderPlanDetailItem}>
              {convertNumber(data[i].data)}GB
            </div>
            <div className={styles.OrderPlanDetailItem}>
              {convertNumber(data[i].shareData)}GB
            </div>
            <div className={styles.OrderPlanDetailItem}>
              {convertNumber(data[i].voice)}분
            </div>
            <div className={styles.OrderPlanDetailItem}>
              {convertNumber(data[i].message)}건
            </div>
          </div>
        </div>
      </div>
    );
  }
  return planPreviewList;
};

function Detail() {
  const { net_sp, pl_code, ph_code, color, dc_type } = useParams();
  const DETAIL_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/detail?pl_code=${pl_code}&ph_code=${ph_code}&color=${color}&dc_type=${dc_type}`;
  const PLAN_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/plan?net_sp=`;

  // 데이터 로딩 & 에러
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 로 받아온 모바일 상품 상세 정보 & 요금제 정보
  const [data, setData] = useState(SampleDetailData);
  const [plans, setPlans] = useState(SamplePlanData);

  // 현재 사용자가 선택한 요금제 & 할인유형
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plan, setPlan] = useState([]); // 현재 요금제 정보
  const [imgPaths, setImgPaths] = useState([]);
  const [planValue, setPlanValue] = useState(pl_code);
  const [planModalValue, setPlanModalValue] = useState(pl_code);
  const [discountValue, setDiscountValue] = useState(dc_type);
  const [sortValue, setSortValue] = useState("0");

  // 요금제 변경 함수
  const onApplyPlan = () => {
    setPlanValue(planModalValue);
    onClose();
  };

  const onPlanValueChange = (value) => {
    console.log(value);
    setPlanValue(value);
    setPlanModalValue(value);
  };

  // API 통신
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

  // 가입 유형
  const [joinType, setJoinType] = useState("0");
  const onClickJoinType = (v) => {
    //console.log(v);
    setJoinType(v);
  };

  // 할인 유형
  const onChangeDiscountValue = (value) => {
    setDiscountValue(value);
  };

  // 초기 세팅
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
    //console.log(nowPlanPrice);
    setPrices(nowPlanPrice);
    setNowPrice(calcDiscountPrice(discountValue, nowPlanPrice));
  }, []);

  // 요금제 & 할인유형 변할 때마다 새로운 정보로 update
  useEffect(() => {
    console.log(planValue, discountValue);
    const nowPlan = findSelectPlan(planValue);
    setPlan(nowPlan);
    const nowPlanPrice = calcMonthPrice(
      data["phone"]["price"],
      nowPlan["price"]
    );
    setPrices(nowPlanPrice);
    //console.log(nowPlanPrice);
    setNowPrice(calcDiscountPrice(discountValue, nowPlanPrice));
    //console.log(calcDiscountPrice(discountValue, nowPlanPrice));
  }, [planValue, discountValue]);

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
                <span className={styles.JoinTypeBtnSpan}>기기변경</span>
              </button>
              <button
                className={styles.JoinTypeBtn}
                style={{ borderColor: joinType === "1" ? "#000" : "#ddd" }}
                onClick={(e) => onClickJoinType("1")}
              >
                <span className={styles.JoinTypeBtnSpan}>번호이동</span>
              </button>
              <button
                className={styles.JoinTypeBtn}
                style={{ borderColor: joinType === "2" ? "#000" : "#ddd" }}
                onClick={(e) => onClickJoinType("2")}
              >
                <span className={styles.JoinTypeBtnSpan}>신규가입</span>
              </button>
            </Stack>
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
                        <div className={styles.OrderInfoTdBtn}>
                          자세히 보기 ❯
                        </div>
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
                                  <div>공시지원금</div>
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
                            }}
                          >
                            <div className={styles.OrderInfoTdRight}>
                              {/* 선택약정할인 */}
                              <div>선택약정할인</div>
                              <div>통신요금 25% 할인</div>
                              <div className={styles.SelectPlan}>
                                <Radio value="2">24개월 할인</Radio>
                                <span className={styles.SelectPlanPrice}>
                                  총 -
                                  {convertNumber(
                                    Number(plan.price * 24 * 0.25)
                                  )}{" "}
                                  원
                                </span>
                              </div>
                              <div className={styles.SelectPlan}>
                                <Radio value="3">12개월 할인</Radio>
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
