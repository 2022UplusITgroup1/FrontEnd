// 검색 페이지

import React, { useEffect, useState } from "react";
import customAxios from "../../lib/customAxios";
import styles from "./Search.module.css";
import { FiSearch, FiAlertCircle } from "react-icons/fi";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import ResultList from "../../components/Search/ResultList";

const SEARCH_WORD_URL = `/search?query=`;

const PLAN_4G_API_URL = `/product/plan?net_sp=4g`;
const PLAN_5G_API_URL = `/product/plan?net_sp=5g`;

//word 검색결과 없을 경우 반환
function noResult({ searchWord }) {
  // console.log("noResult",searchWord);
  if (searchWord === "") {
    return (
      <div className={styles.noResult}>
        <div className={styles.noResultAlert}>
          <FiAlertCircle
            size="50"
            color="lightgray"
            className={styles.noResultAlertIcon}
          />
        </div>
        <div className={styles.ResultTitle}>검색어를 입력해주세요.</div>
      </div>
    );
  } else {
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
          "{searchWord}"에 대한 검색 결과가 없습니다
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

function insertResult({ searchWord, products, plan4g, plan5g }) {
  // console.log("insert",plan4g, plan5g) // 잘들어옴

  return (
    <div className={styles.insertResult}>
      <div className={styles.ResultTitle}>
        "{searchWord}"에 대한 검색 결과입니다.
      </div>

      <div className={styles.ResultListItems}>
        <ResultList products={products} plan4g={plan4g} plan5g={plan5g} />
      </div>
    </div>
  );
}

function Search() {
  const [initialMessage, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const [plan4g, setPlan4g] = useState([]);
  const [plan5g, setPlan5g] = useState([]);

  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const onChange = (e) => {
    setWord(e.target.value);
    console.log(e.ta);
  };

  const getProducts = async (word) => {
    try {
      const response = await customAxios.get(`${SEARCH_WORD_URL}${word}`);
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
        setProducts(filteredRes);
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.log(e);
      setProducts([]);
    }
  };

  const getPlan4g = async () => {
    let plan4gRes = [];

    try {
      const response = await customAxios.get(`${PLAN_4G_API_URL}`);
      plan4gRes = response.data.data[0];
    } catch (e) {
      console.log(e);
    }

    setPlan4g(plan4gRes);
  };

  const getPlan5g = async () => {
    let plan5gRes = [];

    try {
      const response = await customAxios.get(`${PLAN_5G_API_URL}`);
      plan5gRes = response.data.data[0];
    } catch (e) {
      console.log(e);
    }

    setPlan5g(plan5gRes);
  };

  const onClick = (word) => {
    setSearchWord(word);
    getProducts(word);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick(word);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPlan4g(getPlan4g());
    setPlan5g(getPlan5g());

    setWord("");
    setSearchWord("");
    setMessage("검색어를 입력해주세요.");
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
        {products.length !== 0 && searchWord !== "" ? (
          <div>{insertResult({ searchWord, products, plan4g, plan5g })}</div>
        ) : (
          <div>{noResult({ searchWord })}</div>
        )}
      </div>
    </div>
  );
}

export default Search;
