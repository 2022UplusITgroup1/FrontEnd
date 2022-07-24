// 상세 페이지 > 상품 이미지

import React, { useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";

function ImgDetail({ data, imgPaths }) {
  // 이미지 클릭 시, index 변경
  const [idx, setIdx] = useState(0);
  const onChangeImg = (e) => {
    setIdx(e.target.id);
  };

  return (
    <>
      <div className={styles.ProductImg}>
        <div className={styles.MainImg}>
          <img
            className={styles.MainImg}
            src={data.phone.code && data["images"][Number(idx)]["imgPath"]}
            alt={data.phone.code && data["images"][Number(idx)]["imgPos"]}
          />
        </div>
        <div className={styles.PreviewImgs}>
          {imgPaths.map((url, i) => (
            <button className={styles.PreviewBtn} onClick={onChangeImg} key={i}>
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
    </>
  );
}

export default ImgDetail;