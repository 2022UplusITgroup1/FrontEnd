// 최근 본 상품

import { useEffect, useState } from "react";
import styles from "./RecentlyViewed.module.css";
import { Link } from "react-router-dom";
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
import convertNumber from "../../utils/convertNumber";
import { useSelector } from "react-redux";
import RecentlyProduct from "./RecentlyProduct";
import SampleRecentlyData from "../../SampleRecentlyData.json";
import RecentlyPreviewProduct from "./RecentlyPreviewProduct";

function RecentlyViewed({ products, plans, category }) {
  //const DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`;

  const productList = useSelector((state) => state.recentlyReducer);
  //console.log(productList);

  // 최근 본 상품 전체 리스트
  const [data, setData] = useState(products);
  const [storedData, setStoredData] = useState([]);
  const [limitedProducts, setLimitedProducts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOrderClose = (e) => {
    onClose();
  };

  const limitProducts = () => {
    let p = [];
    let len = storedData.length > 3 ? 3 : storedData.length;
    for (let i = 0; i < len; i++) {
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

  useEffect(() => {
    setStoredData(productList.items);
  }, [productList]);

  useEffect(() => {
    limitProducts();
  }, [storedData]);

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
            onClick={onOpen}
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
            <div>
              {storedData && storedData.length > 0 ? (
                storedData.map((d, i) => {
                  //console.log(d);
                  const findedProduct = findProduct(d.phoneCode);
                  const findedPlan = findPlan(d.planCode);
                  // 일치하는 데이터가 없을 경우 대비
                  return findedProduct && findedPlan ? (
                    <RecentlyProduct
                      product={findedProduct}
                      plan={findedPlan}
                      discountValue={d.discountType}
                      color={d.phoneColor}
                      category={d.networkSupport}
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
