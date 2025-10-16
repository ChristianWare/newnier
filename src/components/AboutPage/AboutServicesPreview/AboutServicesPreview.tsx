import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutServicesPreview.module.css";
import Logo from "@/components/shared/Logo/Logo";
import { services } from "@/lib/data";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import Digital from "@/components/shared/Digital/Digital";
import Plane from "@/components/icons/Plane/Plane";
import Clock from "@/components/icons/Clock/Clock";
import Location from "@/components/icons/Location/Location";
import Golf from "@/components/icons/Golf/Golf";
import Business from "@/components/icons/Business/Business";
import Luxury from "@/components/icons/Luxury/Luxury";
import Party from "@/components/icons/Party/Party";

export default function AboutServicesPreview() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <Logo className={styles.logo} />
            <div className={styles.iconContainer}>
              <Plane className={styles.icon} />
              <Clock className={styles.icon} />
              <Location className={styles.icon} />
              <Golf className={styles.icon} />
              <Business className={styles.icon} />
              <Luxury className={styles.icon} />
              <Party className={styles.icon} />
            </div>
            <h2 className={styles.heading}>
              The most common services <br className={styles.br} /> we offer at
              Nier
            </h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {services.slice(0, 4).map((x) => (
                <div key={x.id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <h3 className={`${styles.title} h6`}>{x.title}</h3>
                    <div className={styles.circleBtnContainer}>
                      <Button
                        btnType='arrowBtn'
                        arrow
                        href={`/services/${x.slug}`}
                      />
                    </div>
                  </div>
                  <div className={styles.cardRight}>
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
              ))}
            </div>
            <div className={styles.bottomInfo}>
              <h3 className={`${styles.subHeading} h5`}>
                Chauffeur Services Tailored to Every Journey
              </h3>
              <div className={styles.bottomInfoBottom}>
                <p className={styles.copy}>
                  Whether you’re catching a red-eye, hosting corporate VIPs, or
                  whisking a bridal party between venues, Nier Transportation
                  moves people smoothly and discretely across Arizona and the
                  Southwest.
                </p>
                <div className={styles.btnClusterContainer}>
                  <Button
                    href='/services'
                    text='See all Services'
                    btnType='yellow'
                  />
                </div>
                <div className={styles.digitalBox}>
                  <Digital />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
