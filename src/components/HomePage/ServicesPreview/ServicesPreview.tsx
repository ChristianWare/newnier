import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServicesPreview.module.css";
import Button from "@/components/shared/Button/Button";
import Image from "next/image";
import { services } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

export default function ServicesPreview() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <SectionHeading text='Services' />

            <h2 className={styles.heading}>
              The most common services <br className={styles.break} /> we offer
              at Nier
            </h2>
          </div>
          {/* <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {services.slice(0, 4).map((x) => (
                <div key={x.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardTopLeft}>
                      <SectionHeading text='Advanced' />
                    </div>
                    <div className={styles.cardTopRight}>
                      <div className={styles.imgContainer}>
                        <Image
                          src={x.src}
                          alt={x.title}
                          fill
                          className={styles.img}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.meta}>
                      <h3 className={styles.title}>{x.title}</h3>
                      <p className={styles.desc}>{x.copy}</p>
                    </div>
                    <div className={styles.circleBtnContainer}>
                      <Button
                        btnType='arrowBtn'
                        arrow
                        href={`/services/${x.slug}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className={styles.bottom}>
            {services.slice(0, 4).map((x) => (
              <div key={x.id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={x.src}
                      alt={x.title}
                      fill
                      className={styles.img}
                    />
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <div className={styles.cardRightTop}>
                    <h3 className={styles.title}>{x.title}</h3>
                  </div>
                  <div>
                    <p className={styles.desc}>{x.copy}</p>
                    <div className={styles.btnContainer}>
                      <Button
                        text='Learn More'
                        btnType='navGray'
                        href={`/services/${x.slug}`}
                        arrow
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btnClusterContainer}>
          <Button href='/' text='See All Services' btnType='black' />
        </div>
      </LayoutWrapper>
    </section>
  );
}
