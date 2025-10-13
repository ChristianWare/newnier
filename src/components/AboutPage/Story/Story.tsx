import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Story.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/barry.jpg";
import Digital from "@/components/shared/Digital/Digital";
import Button from "@/components/shared/Button/Button";

export default function Story() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image src={Img1} fill alt='' title='' className={styles.img} />
              <div className={styles.digitalBox}>
                <Digital color="yellow" />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={`${styles.heading} h3`}>
              Founded in 2004, Nier Transportation was born out of a passion for
              delivering exceptional transportation experiences.
            </h2>
            <div className={styles.copyContainer}>
              <div className={styles.box}>
                <span className={styles.dot} />
                <p className={styles.copy}>
                  Our fleet of late-model sedans, SUVs, and limousines is
                  meticulously maintained, and our chauffeurs are hand-selected,
                  background-checked professionals committed to your comfort and
                  peace of mind.
                </p>
              </div>
              <div className={styles.box}>
                <span className={styles.dot} />
                <p className={styles.copy}>
                  With 24/7 customer support, transparent pricing, and a
                  relentless focus on exceeding expectations, Nier
                  Transportation sets the standard for high-end ground
                  transportation in the Valley.
                </p>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button href='/' text='Book your ride' btnType='black' arrow />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
