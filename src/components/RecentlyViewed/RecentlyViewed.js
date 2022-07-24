// 최근 본 상품

import { useEffect, useState } from "react";
import styles from "./RecentlyViewed.module.css";
import { Grid, GridItem, Box, Image, Button } from "@chakra-ui/react";
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
import { useSelector } from "react-redux";
import RecentlyProduct from "./RecentlyProduct";
import RecentlyPreviewProduct from "./RecentlyPreviewProduct";
import axios from "axios";

const RECENT_PRODUCT_API_URL = `/product/recents`;

function RecentlyViewed({ products, plans, category }) {
  //const DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`;

  // Redux store 에 저장된 최근 본 상품
  const productList = useSelector((state) => state.recentlyReducer);
  //console.log(productList);

  // 최근 본 상품 전체 리스트
  const [recentlyProducts, setRecentlyProducts] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [limitedProducts, setLimitedProducts] = useState([]);

  // 데이터 로딩 & 에러 처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOrderClose = (e) => {
    onClose();
  };

  const limitProducts = () => {
    let p = [];
    let len = storedData.length > 2 ? 2 : storedData.length;
    for (let i = len - 1; i >= 0; i--) {
      p.push(storedData[i]);
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
      setLoading(true);
      setError(null);
      const response = await axios.get(`${RECENT_PRODUCT_API_URL}`);
      console.log(response.data);
      if (response.data.data !== null) {
        console.log("getRecents SUCCESS ");
        setRecentlyProducts(response.data.data);
      } else {
        // 알맞은 결과를 찾을 수 없습니다
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setStoredData(productList.items.slice(0, 8));
  }, [productList]);

  useEffect(() => {
    limitProducts();
  }, [storedData]);

  const viewAllButton = () => {
    getRecents();
    onOpen();
  };

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
                  //console.log(d);
                  const findedProduct = findProduct(d.code);
                  const findedPlan = findPlan(d.planCode);
                  // 일치하는 데이터가 없을 경우 대비
                  return findedProduct && findedPlan ? (
                    <RecentlyProduct
                      product={findedProduct}
                      plan={findedPlan}
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
