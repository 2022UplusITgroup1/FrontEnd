// 최근 본 상품

import { useEffect, useState } from "react";
import styles from "./RecentlyViewed.module.css";
import { Grid, GridItem, Box, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import RecentlyProduct from "./RecentlyProduct";
import RecentlyPreviewProduct from "./RecentlyPreviewProduct";
import axios from "axios";
import customAxios from "../../lib/customAxios";
import { useCookies } from "react-cookie";

const RECENT_PRODUCT_API_URI = `/product/recents`;

function RecentlyViewed({ products, plans, category }) {
  //const DETAIL_URI = `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`;

  // 최근 본 상품 전체 리스트
  const [recentlyProducts, setRecentlyProducts] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [limitedProducts, setLimitedProducts] = useState([]);

  // Cookie에 저장된 JSessionID
  const cookies = useCookies(["JSESSIONID"]);
  // console.log(cookies.JSESSIONID);

  // 데이터 에러 처리
  const [error, setError] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 2개로 개수 제한
  const limitProducts = () => {
    let p = [];
    let len = storedData.length > 2 ? 2 : storedData.length;
    for (let i = 1; i <= len; i++) {
      p.push(storedData[storedData.length - i]);
    }
    //console.log(p);
    setLimitedProducts(p);
  };

  const findPlan = (value) => {
    //console.log(value);
    const plan = plans.find((p) => p.code === value);
    //console.log(plan);
    return plan;
  };

  const findProduct = (value) => {
    //console.log(value);
    const product = products.find((p) => p.code === value);
    //console.log(product);
    return product;
  };

  const getRecents = async () => {
    try {
      setError(null);
      const response = await customAxios.get(`${RECENT_PRODUCT_API_URI}`);
      console.log(response.data);
      if (response.data.data !== null) {
        console.log("getRecents SUCCESS ");
        // 최대 8개로 제한
        const res = [...response.data.data];
        console.log(res);
        setRecentlyProducts(res.slice(0, 8));
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  /* ----- MYSEO CREATED ----- */
  useEffect(() => {
    if (localStorage.getItem("recents")) {
      let watchedAll = JSON.parse(localStorage.getItem("recents"));
      console.log(watchedAll);
      let matchWatched = [];
      if (watchedAll.length > 0) {
        for (let i = 0; i < watchedAll.length; i++) {
          if (watchedAll[i].jSessionId === cookies.JSESSIONID)
            matchWatched.push(watchedAll[i]);
        }
      }
      // console.log("matched : " + JSON.stringify(matchWatched))
      setStoredData(matchWatched);
    }
  }, []);

  useEffect(() => {
    limitProducts();
  }, [storedData]);

  const viewAllButton = () => {
    getRecents();
    if (!error) onOpen();
  };
  /* ----- END ----- */

  return (
    <div className={styles.Container}>
      <Grid
        templateAreas={`"header"
                  "img"
                  "description"
                  "total"`}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="1" area={"header"}>
          <Box bg="#E6007E" p={4} color="white">
            최근 본 상품
          </Box>
        </GridItem>
        {limitedProducts.length > 0 ? (
          limitedProducts.map((lp, i) => {
            //console.log(lp);
            return <RecentlyPreviewProduct product={lp} key={i} />;
          })
        ) : (
          <div>없음</div>
        )}
        <GridItem pl="1" area={"total"}>
          <Box
            className={styles.TotalBtn}
            bg="silver"
            p={4}
            color="white"
            onClick={viewAllButton}
          >
            전체보기
          </Box>
        </GridItem>
      </Grid>
      {/* 전체보기 모달 */}
      <Modal
        className={styles.Modal}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className={styles.ModalContent}>
          <ModalHeader>최근 본 상품 전체보기</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={styles.ModalBody}>
            <div className={styles.ModalImgBox}>
              {recentlyProducts && recentlyProducts.length > 0 ? (
                recentlyProducts.map((d, i) => {
                  console.log(d);

                  // 일치하는 데이터가 없을 경우 대비
                  return d ? (
                    <RecentlyProduct
                      productCode={d.code}
                      productName={d.name}
                      productPrice={d.price}
                      productImgThumbnail={d.imgThumbnail}
                      planCode={d.planCode}
                      planName={d.planName}
                      planPrice={d.planPrice}
                      discountType={d.discountType.toString()}
                      color={d.color}
                      category={d.networkSupport}
                      monthPrice={d.monPrice}
                      key={i}
                    />
                  ) : (
                    <div key={i}>정보가 없습니다</div>
                  );
                })
              ) : (
                <div>정보가 없습니다</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RecentlyViewed;
