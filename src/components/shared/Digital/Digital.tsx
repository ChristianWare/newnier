import styles from "./Digital.module.css";

interface DigitalProps {
  size?: string;
}

export default function Digital({ size = "" }: DigitalProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
      <div className={`${styles.node} ${styles[size]} `}></div>
    </div>
  );
}
