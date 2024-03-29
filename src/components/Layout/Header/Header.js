// Header

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FiSearch, FiInbox } from "react-icons/fi";

function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderTitle}>
        <a href="/" className={styles.LogoImg}>
          LG U+
        </a>
      </div>
      <div className={styles.HeaderMenu}>
        <div className={styles.HeaderMenuInner}>
          <div className={styles.HeaderMenuNavContainer}>
            <div className={styles.HeaderMenuNav}>
              <div className={styles.HeaderLeftMenu}>
                <Link to="/mobile/5G" className={styles.NavItem}>
                  5G 휴대폰
                </Link>
                <Link to="/mobile/4G" className={styles.NavItem}>
                  4G 휴대폰
                </Link>
              </div>
            </div>
            <div className={styles.HeaderRightMenu}>
              {/* 검색 & 주문 조회 */}
              <Link to="/mobile/search">
                <FiSearch size="30" className={styles.NavIcon} />
              </Link>
              <Link to="/mobile/inquiry">
                <FiInbox size="30" className={styles.NavIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
