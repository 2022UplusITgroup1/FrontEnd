import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.Container}>
      <div className={styles.AddressInfo}>
        ㈜엘지유플러스 서울특별시 용산구 한강대로 32 대표이사 황현식
        사업자등록번호 220-81-39938 통신판매신고 제 2015-서울용산-00481호
        <br />
        고객센터 휴대폰 114(무료) 1544-0010(유료) 인터넷/IPTV/전화 101(무료)
        가입문의 휴대폰 1644-7009(유료) 인터넷/IPTV 1644-7070(유료) 스마트홈
        1544-0107(유료) 소상공인 인터넷/IPTV/전화 1800-8000(유료)
      </div>
      <div className={styles.CopyrightInfo}>
        Copyright ⓒ LG Uplus Corp. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
