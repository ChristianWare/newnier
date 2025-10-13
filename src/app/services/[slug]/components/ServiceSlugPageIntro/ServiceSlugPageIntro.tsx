"use client";

import { services } from "@/lib/data"; 
import styles from "./ServiceSlugPageIntro.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";

/** Exact, readonly type derived from your data */
type Service = (typeof services)[number];

export default function ServiceSlugPageIntro({
  service,
}: {
  service: Service;
}) {
  if (!service) {
    return (
      <section className={styles.container}>
        {/* <Nav redLogo navItemColor='var(--red)' signUpBtnType='navRedOutline' /> */}
        <LayoutWrapper>
          <div className={styles.container}>
            <h1 className={styles.heading}>Service not found</h1>
            <Link href='/services'>Back to services</Link>
          </div>
        </LayoutWrapper>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {/* <Nav redLogo navItemColor='var(--red)' signUpBtnType='navRedOutline' /> */}
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.top}>
            <h1 className={styles.heading}>{service.title}</h1>
            <div className={styles.imgContainer}>
              <Image src={service.src} fill alt='' className={styles.img} />
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.b1}>
              <div className={styles.description}>Details:</div>
              <h2 className={styles.copy}>{service.copy}</h2>
              <div className={styles.space}></div>
              <p className={styles.desc}>{service.description}</p>
              <div className={styles.space}></div>

              <div className={styles.imgContainer}>
                <Image src={service.src2} fill alt='' className={styles.img} />
              </div>
              <div className={styles.space}></div>

              <div className={styles.featureContainer}>
                {service.features.map((x, index) => (
                  <div className={styles.card} key={x.id}>
                    <div className={styles.indexContainer}>
                      <span className={styles.index}>{index + 1}</span>
                    </div>
                    <h3 className={styles.featureTitle}>{x.title}</h3>
                    <p className={styles.featureDetails}>{x.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <Button
              href='/services'
              text='Back to all services'
              btnType='red'
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
