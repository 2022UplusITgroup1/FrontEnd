import { Link } from "react-router-dom";
import { Grid, GridItem, Box, Image, Button } from "@chakra-ui/react";
import styles from "./RecentlyViewed.module.css";
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

function RecentlyViewed({ product, plans, category }) {
  //const DETAIL_URL = `/mobile/detail/${category}/${plan.code}/${product.code}/${product.color}/${product.discountType}`;

  const options = useSelector((state) => state.changeOptionReducer);
  //console.log(options);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOrderClose = (e) => {
    onClose();
  };

  const findSelectPlan = (value) => {
    return plans.find((p) => p.code === value);
  };

  const property = {
    imageUrl:
      "https://image.lguplus.com/static/pc-contents/images/prdv/20220616-073051-526-l4VusvGl.jpg",
    imageAlt: "Galaxy Buddy 2",
    title: "Galaxy Buddy 2",
    subTitle: "5G 라이트+ | 공시지원금",
    phone: "0",
    plan: "55000",
    total: "55000",
    reviewCount: 34,
    rating: 4,
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
        <Link to="/detail/1">
          <GridItem pl="1" area={"img"}>
            <Box className={styles.ImgBox}>
              <Image
                className={styles.ProductImg}
                src={property.imageUrl}
                alt={property.imageAlt}
              />
            </Box>
          </GridItem>
          <GridItem
            className={styles.Description}
            pl="1"
            bg="lightgray"
            area={"description"}
          >
            {property.title}
            <br />
            {convertNumber(property.total)} 원
          </GridItem>
        </Link>
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
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>최근 본 상품 전체보기</ModalHeader>
              <ModalCloseButton />
              <ModalBody>최근 본 상품 리스트</ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
      </Grid>
    </div>
  );
}

export default RecentlyViewed;
