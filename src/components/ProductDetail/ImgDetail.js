// 상세 페이지 > 상품 이미지

import React, { useState } from "react";
import styles from "../../pages/Detail/Detail.module.css";

const IMAGE_URI = `https://d2i7g6t0sifvpq.cloudfront.net`;

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
          {data.phone.code && (
            <img
              className={styles.MainImg}
              src={imgPaths[Number(idx)]}
              alt={data["images"][Number(idx)]["imgPos"]}
            />
          )}
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
