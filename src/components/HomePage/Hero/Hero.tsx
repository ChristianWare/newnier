import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Hero.module.css";
import Button from "@/components/shared/Button/Button";
import ImageCluster from "@/components/shared/ImageCluster/ImageCluster";

export default function Hero() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.left}>
              <h1 className={styles.heading}>
                Reliable black car service across phoenix & beyond.
              </h1>
              <p className={styles.copy}>
                At Nier Transportation, we’re more than a car service; we’re
                your trusted partner in high end transportation.
              </p>
              <div className={styles.btnClusterContainer}>
                <Button href='/' text='Reserve Ride Now' btnType='black' />
                <ImageCluster />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.infoBox}>
                
              </div>
            </div>
          </div>
          <div className={styles.bottom}></div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
