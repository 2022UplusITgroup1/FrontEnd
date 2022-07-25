// 비교하기 상세 모달

import React, { useState, useEffect } from "react";
import styles from "./CompareDetail.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import CompareItem from "./CompareItem";
import EmptyItem from "./EmptyItem";


const COMPARE_URI = `/product/compare`;
const PRODUCTS_API_URI = `/product/phone?net_sp=`;


const initialData = {
  phone: {
    code: "",
    name: "",
  },
  plan: {
    code: "",
    name: "",
  },
};

function CompareDetail({ isOpen, onClose, data }) {
  //console.log(data);

  const dispatch = useDispatch();

  // 현재 선택된 비교하기 상품들 가져오기
  const compareDetailItems = useSelector(
    (state) => state.compareDetailReducer
  ).items;
  //console.log(compareDetailItems);

  // 데이터 에러 처리
  const [error, setError] = useState(null);

  // 비교하기 아이템 리스트
  const [compareData, setCompareData] = useState([]);

  const [emptyLength, setEmptyLength] = useState(0);
  const [payPeriods, setPayPeriods] = useState([24, 24, 24]);
  const [prices, setPrices] = useState([]);
  const [discountTypes, setDiscountTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);

  // 선택한 값
  const [brandTypes, setBrandTypes] = useState("0");
  const [phoneTypes, setPhoneTypes] = useState("");
  const [payPeriod, setPayPeriod] = useState(24);

  const onChangePayPeriod = (e) => {
    setPayPeriod(e.target.value);
    //console.log(e.target.value);
  };

  // API: 비교하기 결과 POST
  const fetchCompareData = async () => {
    let requestBody = [];
    compareDetailItems.map((d) =>
      requestBody.push({
        code: d.code,
        networkSupport: d.networkSupport,
        discountType: d.discountType,
        color: d.color,
        plan: d.plan,
      })
    );

    try {
      setError(null);
      const response = await axios.post(`${COMPARE_URI}`, requestBody);

      if (response.data.data !== null) {
        console.log("fetchCompareData SUCCESS ");
        const res = [...response.data.data];
        // 빈 부분 개수 저장
        setEmptyLength(3 - res.length);
        //console.log(res.length);
        // 3개가 되지 않으면 empty 처리
        for (let i = res.length; i < 3; i++) {
          res.push(initialData);
        }
        setCompareData(res);
        //console.log(res);
      }
    } catch (e) {
      //console.log(e);
      setError(e);
    }
  };

  // GET 상품 전체 리스트
  const getProducts = async (netType) => {
    try {
      setError(null);
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
        return filteredRes;
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  // 맨 처음 렌더링 될 때만 수행
  useEffect(() => {
    // 5G, 4G 상품 모두 가져오기
    const promises = ["5G", "4G"].map((c) => {
      return getProducts(c);
    });
    // 2개의 리스트를 합쳐주기
    Promise.all(promises).then((res) => {
      setProducts([...res[0], ...res[1]]);
    });
  }, []);

  useEffect(() => {
    if (compareDetailItems.length) {
      fetchCompareData();
      //setCompareData(SampleCompareData);
    } else {
      onClose();
    }
  }, [compareDetailItems]);

  useEffect(() => {
    //console.log(compareData);
    // 상세 조회 당시의 할인유형 값
    let dcTypes = [];
    compareDetailItems.map((d) => dcTypes.push(d.discountType));
    // 3개가 되지 않으면 empty 처리
    for (let i = compareDetailItems.length; i < 3; i++) {
      dcTypes.push("1");
    }
    //console.log(dcTypes);
    setDiscountTypes(dcTypes);

    /*
    // 계약기간 => 기본 = 24, 선택약정12개월 = 12
    let payPeriod = discountType === "3" ? 12 : 24;
    let periods = [];
    compareDetailItems.map((d) => {
      
    });
    // 3개가 되지 않으면 empty 처리
    for (let i = compareDetailItems.length; i < 3; i++) {
      dcTypes.push("1");
    }
    //console.log(periods);
    setPayPeriods(periods);
    */
  }, [compareData]);

  //if (error) return <div>Error!</div>;
  //if (!compareItemInfo.length) return null;
  //if (!compareData.length) return null;

  return (
    <Modal
      className={styles.Modal}
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className={styles.ModalContent}>
        <ModalHeader className={styles.ModalHeader}>비교결과</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.ModalBody}>
          <div className={styles.ModalItemContainer}>
            {compareDetailItems.length === compareData.length - emptyLength &&
              compareData.length &&
              compareData[0].phone.code &&
              compareData.map((c, i) => {
                //console.log(c);
                return c.phone.code !== "" ? (
                  <CompareItem
                    key={i}
                    index={i}
                    item={c}
                    payPeriod={payPeriods[0]}
                    discountType={compareDetailItems[i].discountType}
                  />
                ) : (
                  products.length && <EmptyItem key={i} products={products} />
                );
              })}
          </div>
        </ModalBody>
        <ModalFooter className={styles.ModalFooter}>
          <div className={styles.FooterBtnContainer}>
            <Button onClick={onClose} className={styles.FooterCancelBtn}>
              확인
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CompareDetail;
