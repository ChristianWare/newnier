import styles from "./FinalCTA.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import LayoutWrapper from "../LayoutWrapper";

export default function FinalCTA() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <Logo className={styles.logo} />
          </div>
          <div className={styles.bottom}>
            <h2 className={styles.heading}>
              Take the first step toward <br className={styles.br} /> an
              elevated travel experience.
            </h2>

            <div className={styles.btnContainer}>
              <Button href='/' text='Book Now' btnType='black' />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
