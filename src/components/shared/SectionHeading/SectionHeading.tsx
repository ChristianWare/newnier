import styles from "./SectionHeading.module.css";

export default function SectionHeading({ text }: { text: string }) {
  return (
    <div className={styles.container}>
      <span className={styles.dot} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
