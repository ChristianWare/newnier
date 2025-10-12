import Button from "../Button/Button";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./FinalCTA2.module.css";

import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

export default function FinalCTA2() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.scrollContainer}>
            <HorizontalScroll />
            </div>
          </div>
          <div className={styles.bottom}>
            <h2 className={styles.heading}>
              {" "}
              Take the first step toward <br className={styles.br} /> an
              elevated travel experience.
            </h2>
            <p className={styles.copy}>
              Schedule your ride today and experience the comfort and
              reliability of our premium black car service.
            </p>
            <div className={styles.btnContainer}>
              <Button href='/' text='Book Your Ride' btnType='black' arrow />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
