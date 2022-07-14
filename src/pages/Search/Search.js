import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { FiSearch, FiAlertCircle } from "react-icons/fi";
import {
  Input,
  InputGroup,
  InputLeftElement,
  RangeSliderThumb,
} from "@chakra-ui/react";

function noResult({ word }) {
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

function Search() {
  const [word, setWord] = useState("");
  const onChange = (e) => {
    setWord(e.target.value);
    console.log(e.ta);
  };
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
            />
          </InputGroup>
        </div>
        <div>{noResult(word)}</div>
      </div>
    </div>
  );
}

export default Search;
