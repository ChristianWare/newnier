import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Hero.module.css";
import Button from "@/components/shared/Button/Button";
import ImageCluster from "@/components/shared/ImageCluster/ImageCluster";
import Digital from "@/components/shared/Digital/Digital";
import Image from "next/image";
import Img1 from "../../../../public/images/hero.jpg";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

export default function Hero() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.left}>
              <SectionHeading text='Nier Transportation' />
              <h1 className={styles.heading}>
                Reliable black car service <br className={styles.br} /> across phoenix & beyond.
              </h1>
              <p className={styles.copy}>
                At Nier Transportation, we’re more than a car service; we’re
                your trusted partner in high end transportation.
              </p>
              <div className={styles.btnClusterContainer}>
                <Button href='/' text='Book your ride' btnType='black' arrow />
                <ImageCluster />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.statBox}>
                <div className={styles.digitalBox}>
                  <Digital />
                </div>
                <div className={styles.stat}>20+</div>
                <div className={styles.statii}>Years of experience</div>

                <div className={styles.statiii}>
                  <div className={styles.statiiiText}>
                    Trusted by over 10,000 customers.
                  </div>
                  {/* <Button
                    href='/'
                    text='Reserve Ride Now'
                    btnType='blackCircle'
                    arrow
                  /> */}
                </div>
              </div>
              <div className={styles.imgContainer}>
                <Image
                  src={Img1}
                  alt='hero image'
                  className={styles.img}
                  priority
                  fill
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.imgContainer}>
              <Image
                src={Img1}
                alt='hero image'
                className={styles.img}
                priority
                fill
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
