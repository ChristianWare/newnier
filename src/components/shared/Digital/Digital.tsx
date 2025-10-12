import styles from "./Digital.module.css";

interface DigitalProps {
  size?: string;
  color?: string;
}

export default function Digital({ size = "", color = "" }: DigitalProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`${styles.node} ${styles[size]} ${styles[color]}`}
        ></div>
      ))}
    </div>
  );
}
