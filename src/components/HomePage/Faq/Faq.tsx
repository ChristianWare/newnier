import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Faq.module.css";
import Image from "next/image";

export default function Faq() {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
