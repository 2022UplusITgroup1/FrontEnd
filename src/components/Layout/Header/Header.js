import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderTitle}>
        <Link to="/" className={styles.LogoImg}></Link>
      </div>
      <div className={styles.HeaderMenu}>
        <div className={styles.HeaderMenuInner}>
          <div className={styles.HeaderMenuNav}>
            <Link to="/5g-phone" className={styles.NavItem}>
              5G 휴대폰
            </Link>
            <Link to="/4g-phone" className={styles.NavItem}>
              4G 휴대폰
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

/*
Navigation 검색 부분
<div className={styles.HeaderMenuContens}>
    <div className={styles.MenuItem}>검색</div>
</div>
*/
