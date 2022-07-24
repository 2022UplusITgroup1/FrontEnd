// 상세 페이지 > 상품 정보

import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import { selectDetail } from "../../actions";
import mapDiscountType from "../../utils/mapDiscountType";
import calcPrices from "../../utils/calcPrices";

// 결제 금액 초기화 값
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

function InfoDetail({ data, plan, colors }) {
  const dispatch = useDispatch();

  const orderProduct = useSelector((state) => state.orderReducer);
  //console.log(orderProduct);

  // 색상
  const [colorType, setColorType] = useState(orderProduct.phone.color);
  const [nowPrice, setNowPrice] = useState(initialPrice);

  // Redux Dispatch -> 주문 정보 저장
  const onSelectDetail = (nowPlan, nowTotalPrice) => {
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
      discountType: orderProduct.discountType,
      monthPrice: nowTotalPrice.total,
      payPeriod: orderProduct.payPeriod,
    };
    dispatch(selectDetail(value));
  };

  // color 변경할 때마다 redux 에 update
  useEffect(() => {
    const nowTotalPrice = calcPrices(
      data.phone.price,
      plan.price,
      orderProduct.discountType,
      orderProduct.payPeriod
    );
    setNowPrice(nowTotalPrice);
    onSelectDetail(plan, nowTotalPrice);
  }, [colorType]);

  // 요금제, 할인 유형, 할부기간이 바뀔 때마다 다시 계산
  useEffect(() => {
    const nowTotalPrice = calcPrices(
      data.phone.price,
      plan.price,
      orderProduct.discountType,
      orderProduct.payPeriod
    );
    setNowPrice(nowTotalPrice);
  }, [orderProduct]);

  return (
    <>
      <div className={styles.ProductInfo}>
        <div className={styles.ProductName}>
          {data.phone.code && (
            <span>
              {data.phone.name}
              <span className={styles.ProductCode}>({data.phone.code})</span>
            </span>
          )}
        </div>
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
                  key={color.color}
                  value={color.color}
                  onClick={(e) => setColorType(color.color)}
                  style={{
                    borderColor: colorType === color.color ? "#000" : "#909090",
                  }}
                >
                  <span
                    className={styles.ColorBtnInner}
                    style={{
                      backgroundColor: color.colorHexCode,
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
            {data.phone.code && convertNumber(data.phone.storage.capability)}
            GB
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
          {/* 가격 정보 */}
          <div className={styles.TotalPrice}>
            월 {convertNumber(Number(nowPrice.total))}원
          </div>
          <div className={styles.SubTitle}>
            {orderProduct.plan.code && orderProduct.plan.name},{" "}
            {mapDiscountType(orderProduct.discountType)} 기준
          </div>
          <dl className={styles.PriceDetail}>
            <dt className={styles.PriceDetailDT}>휴대폰</dt>
            <dd className={styles.PriceDetailDD}>
              {convertNumber(Number(nowPrice.monthPhonePrice))} 원
            </dd>
            <dt className={styles.PriceDetailDT}>통신료</dt>
            <dd className={styles.PriceDetailDD}>
              {convertNumber(Number(nowPrice.monthPlanPrice))} 원
            </dd>
            <dt className={styles.PriceDetailDT}>정상가</dt>
            <dd className={styles.PriceDetailDD}>
              {data.phone.code && convertNumber(Number(data.phone.price))} 원
            </dd>
          </dl>
        </div>
        <div className={styles.InfoBtn}>
          {/* 온라인 주문 버튼 */}
          <Link to="/mobile/order">
            <button className={styles.OrderBtn}>온라인 주문</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default InfoDetail;
