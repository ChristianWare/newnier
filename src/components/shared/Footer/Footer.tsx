import LayoutWrapper from "../LayoutWrapper";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <LayoutWrapper>
        <div className={styles.container}>
          <h2>Footer!</h2>
        </div>
      </LayoutWrapper>
    </footer>
  );
}
