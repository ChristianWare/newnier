import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./BlogPageIntro.module.css";

export default function BlogPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h1>Insights & News</h1>
        </div>
      </LayoutWrapper>
    </section>
  );
}
