import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import { FiSearch, FiAlertCircle } from "react-icons/fi";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import ResultList from "../../components/Search/ResultList";
import SampleData from "../../SampleData.json";
import SamplePlanData from "../../SamplePlanData.json";

// const PRODUCT_API_URL = `${process.env.REACT_APP_PRODUCT_SERVICE_API_URL}/phone?net_sp=`;
const SEARCH_WORD_URL = `http://localhost:8000/search?query=`;

const PLAN_4G_API_URL = `http://localhost:8000/product/plan?net_sp=4g`;
const PLAN_5G_API_URL = `http://localhost:8000/product/plan?net_sp=5g`;


//word 검색결과 없을 경우 반환
function noResult({ word }) {
  // alert(word)
  if(word===undefined){
    return (
      <div className={styles.noResult}>
        <div className={styles.noResultAlert}>
          <FiAlertCircle
            size="50"
            color="lightgray"
            className={styles.noResultAlertIcon}
          />
        </div>
        <div className={styles.ResultTitle}>
              검색어를 입력해주세요.
        </div>

      </div>
      
    )
  }else{

    return (

      <div className={styles.noResult}>
        <div className={styles.noResultAlert}>
          <FiAlertCircle
            size="50"
            color="lightgray"
            className={styles.noResultAlertIcon}
          />
        </div>
        <div className={styles.ResultTitle}>
          "{word}"에 대한 검색 결과가 없습니다
        </div>
        <div className={styles.ResultSubTitle}>
          단어의 철자 및 띄어쓰기가 정확한지 확인해 보세요.
          <br />
          한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.
        </div>
      </div>
    );

  }
  
}


function insertResult({ searchWord, products, plans }) {
  return (
    <div className={styles.insertResult}>
      <div className={styles.ResultTitle}>
        "{searchWord}"에 대한 검색 결과입니다. 
      </div>

      <div className={styles.ResultListItems}>
            <ResultList
              products={products}
              plans={plans}
              
            />
          </div>

    </div>
  );
}

function Search() {
  const [products, setProducts] = useState([]);
  // const products = useState([]);
  const [plans, setPlans] = useState([]);

  //검색 결과 저장
  // const [resultProducts, setResulProducts]=useState([]);
  // const resultProducts=useState();
  // var resultProducts

  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const onChange = (e) => {
    setWord(e.target.value);
    console.log(e.ta);
  };

  const getProducts = async (word) => {
    try {
      
      const response = await axios.get(`${SEARCH_WORD_URL}${word}`);
      console.log(response.data.data);
      if (response.data.data !== null) {
        console.log("getProducts SUCCESS ");
        // color 가 다른 기종은 처음 값으로 처리
        const res = response.data.data;
        let filteredRes = res.filter((item, i) => {
          return (
            res.findIndex((item2, j) => {
              return item.code === item2.code;
            }) === i
          );
        });
        //console.log(filteredRes);
        setProducts(filteredRes);
      }
    } catch (e) {
      console.log(e);
    }
  };


  const getPlans = async () => {
    var planList=[];

    try {
      
      const response = await axios.get(`${PLAN_4G_API_URL}`);
      console.log(response.data.data);      
      planList.push.apply(planList,response.data.data)
      // setProducts(response.data.data);

    } catch (e) {
      console.log(e);
    }

    try {
      
      const response = await axios.get(`${PLAN_5G_API_URL}`);
      console.log(response.data.data);

      
      planList.push.apply(planList,response.data.data)
      // setProducts(response.data.data);

    } catch (e) {
      console.log(e);
    }

    setPlans(planList);
    console.log(planList);

  };

  const onClick=(word)=>{
    console.log(word);
    setSearchWord(word);
    getProducts(word);
  }

  const onKeyPress=(e)=>{
    if(e.key ==='Enter'){
      alert(word);
      onClick(word);
  
    }
  }

  useEffect(() => {

    setProducts([]);
    // setPlans(SamplePlanData);
    // setPlans([]);
    setPlans(getPlans());

    setWord("");
    setSearchWord("");


  }, []);
  return (
    <div className={styles.Container}>
      <div className={styles.OrderInfo}>
        <div className={styles.Title}>검색 결과</div>
        <div className={styles.SearchContainer}>
          <InputGroup variant="flushed" size="lg">
            <InputLeftElement pointerEvents="none" children={<FiSearch />} />
            <Input
              type="text"
              placeholder="검색어를 입력하세요"
              className={styles.Input}
              value={word}
              onChange={onChange}
              onKeyDown={onKeyPress}
            />
          </InputGroup>
        </div>
        { products.length !== 0  ? 
                    <div>{insertResult({ searchWord, products, plans })}</div>
                    :
                    <div>{noResult(word)}</div>
                  }
        {/* <div>{noResult(word)}</div> */}
      </div>
    </div>
  );
}

export default Search;
