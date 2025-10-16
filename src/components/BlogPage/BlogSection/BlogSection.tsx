import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./BlogSection.module.css";

export default function BlogSection() {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>{/* Left content goes here */}</div>
          <div className={styles.right}>{/* Right content goes here */}</div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
