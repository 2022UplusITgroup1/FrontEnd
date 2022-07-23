import React, { useEffect, useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertNumber from "../../utils/convertNumber";
import floorNumber from "../../utils/floorNumber";
import { changeOptions, selectDetail } from "../../actions";
import { RadioGroup, Radio, useDisclosure } from "@chakra-ui/react";
import mapDiscountType from "../../utils/mapDiscountType";
import calcDiscountPrice from "../../utils/calcDiscountPrice";
import calcMonthPrice from "../../utils/calcMonthPrice";

function InfoDetail({ data, plan, colors, nowPrice, dcType, color }) {
  const dispatch = useDispatch();

  // 사용자가 선택함에 따라 바뀌는 정보
  const [discountValue, setDiscountValue] = useState(dcType);
  const [colorType, setColorType] = useState(color);
  const [payPeriod, setPayPeriod] = useState(12);

  // TODO: 색깔 바뀔 때마다 Redux 저장

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
            {data.phone.code &&
              convertNumber(data["phone"]["storage"]["capability"])}
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
          <div className={styles.TotalPrice}>
            월 {nowPrice && convertNumber(Number(nowPrice.total))}원
          </div>
          <div className={styles.SubTitle}>
            {plan.code && plan.name}, {mapDiscountType(Number(discountValue))}{" "}
            기준
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
              {data.phone.code && convertNumber(Number(data.phone.price))} 원
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
    </>
  );
}

export default InfoDetail;
