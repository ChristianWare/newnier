import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FleetPostHero.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/cadi.jpg";
import Img2 from "../../../../public/images/cadi2.jpg";
import Digital from "@/components/shared/Digital/Digital";
import Button from "@/components/shared/Button/Button";

export default function FleetPostHero() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image
                src={Img2}
                alt='fleet post hero'
                fill
                className={styles.img}
              />
              <div className={styles.digitalBox}>
                <Digital />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <div className={styles.imgContainerii}>
                <Image
                  src={Img1}
                  alt='fleet post hero'
                  fill
                  className={styles.img}
                />
              </div>
            </div>
            <div className={styles.rightBottom}>
              <h2 className={`${styles.heading} h3`}>
                Our fleet is maintained for top safety, comfort, and performance.
              </h2>
              <p className={styles.copy}>
                Each vehicle is thoroughly inspected and cleaned before every
                ride, guaranteeing a pristine environment for our clients. We
                take pride in offering a diverse selection of vehicles to cater
                to various preferences and needs, from sleek sedans to spacious
                SUVs and luxurious vans.
              </p>
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
