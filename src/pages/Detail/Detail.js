import React, { useState } from "react";
import styles from "./Detail.module.css";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { Link } from "react-router-dom";
import {ButtonGroup, Button, Stack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";

function Detail() {
  const {ph_code} = useParams();
  const property = {
    imageUrl:
      "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-073051-526-l4VusvGl.jpg",
    imageAlt: "Galaxy Buddy 2",
    title: "Galaxy Buddy 2",
    subTitle: "5G 라이트+ | 공시지원금",
    phone: "0",
    communication: "55,000",
    formattedPrice: "55,000",
    color: "라이트 블루",
    capacity: "128GB",
    joinType: "기기변경",
  };
  const imgUrls = [
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-107-EpOJVZKV.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-105-5XFcEWAn.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-123-xI98LvJp.jpg",
    "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-074546-105-6upl4lWx.jpg",
  ];
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState('1');
  const test = (e) => {
    setIdx(e.target.id);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Information}>
        <div className={styles.ProductImg}>
          <div className={styles.MainImg}>
            <img className={styles.MainImg} src={imgUrls[Number(idx)]} alt="PRODUCT" />
          </div>
          <div className={styles.PreviewImgs}>
            {imgUrls.map((url, i) => (
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
          <div className={styles.ProductName}>{property.title}</div>
          <div className={styles.ProductColor}>
          <div className={styles.ProductColorTitle}>색상</div>
            <span>{property.color}</span>
            <div className={styles.ColorBtn}>{/* 색상 버튼 */}</div>
          </div>
          <div className={styles.Capacity}>
          <div className={styles.CapacityTitle}>저장공간</div>
            {/* 저장공간 선택 */}
                <Button value='1'>{property.capacity}</Button>
          </div>
          <div>
            <br />
          </div>
          <div className={styles.JoinType}>
            <div className={styles.JoinTypeTitle}>가입유형</div>
            {/* 가입유형 선택 - radio */}
            <ButtonGroup onChange={setValue} value={value}>
              <Stack direction='row'>
                <Button value='1'>기기변경</Button>
                <Button value='2'>번호이동</Button>
                <Button value='3'>신규가입</Button>
              </Stack>
            </ButtonGroup>
          </div>
          <div className={styles.PriceInfo}>
            <div className={styles.TotalPrice}>월 {property.formattedPrice}원</div>
            <div>{property.subTitle}</div>
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
          <div className={styles.InfoTable}>
            <table>
              <tbody>
                <tr>
                  <th>요금제</th>
                  <td>추천 요금제</td>
                </tr>
                <tr>
                  <th>할인유형</th>
                  <td>공시지원금</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.ProductDetail}>
          {/* 상품 정보 컴포넌트 */}
          <ProductDetail property={property} />
        </div>
      </div>
    </div>
  );
}

export default Detail;
