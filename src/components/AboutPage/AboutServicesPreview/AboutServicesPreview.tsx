import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutServicesPreview.module.css";
import Cog from "@/components/icons/Cog/Cog";
import Deposit from "@/components/icons/Deposit/Deposit";
import Multiple from "@/components/icons/Multiple/Multiple";
import Rebooking from "@/components/icons/Rebooking/Rebooking";
import Support from "@/components/icons/Support/Support";
import Hosting from "@/components/icons/Hosting/Hosting";
import Stariii from "@/components/icons/Stariii/Stariii";
import Logo from "@/components/shared/Logo/Logo";
import { services } from "@/lib/data";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import Digital from "@/components/shared/Digital/Digital";

export default function AboutServicesPreview() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <Logo className={styles.logo} />
            <div className={styles.iconContainer}>
              <Stariii className={styles.icon} />
              <Cog className={styles.icon} />
              <Deposit className={styles.icon} />
              <Multiple className={styles.icon} />
              <Rebooking className={styles.icon} />
              <Support className={styles.icon} />
              <Hosting className={styles.icon} />
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
                    <h3 className={`${styles.title} h5`}>{x.title}</h3>
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
