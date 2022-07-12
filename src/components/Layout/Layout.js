import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.Section}>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
