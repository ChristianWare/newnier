import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FleetPageIntro.module.css";
import Button from "@/components/shared/Button/Button";

export default function FleetPageIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LayoutWrapper>
            <div className={styles.leftContent}>
              <h1 className={styles.heading}>
                Comfortable, impeccably maintained vehicles{" "}
                <br className={styles.br} /> for all your needs.
              </h1>
              <p className={styles.copy}>
                From executive sedans to extended SUVs and premium Sprinters,
                every vehicle in our fleet is selected for ride quality, luggage
                capacity, and in-cabin comfort.
              </p>
              <div className={styles.btnContainer}>
                <Button href='/' text='Book your ride' btnType='black' arrow />
              </div>
            </div>
          </LayoutWrapper>
        </div>
        <div className={styles.right}>
          <video
            preload='auto'
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          >
            <source src='./videos/fleetii.mp4' type='video/mp4' />
          </video>
        </div>
      </div>
    </div>
  );
}
