/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FleetSlugPageIntro.module.css";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import type { Vehicle } from "@/lib/ypes/fleet";
// optional fallback image if none in data:
import ImgFallback from "../../../../../../public/images/vip.jpg";

export default function FleetSlugPageIntro({ vehicle }: { vehicle: Vehicle }) {
  const heroImg =
    (vehicle.images?.[0]?.src as any) || (vehicle.src as any) || ImgFallback;
  const heroAlt = vehicle.images?.[0]?.alt ?? vehicle.title;
  const lead = vehicle.shortDesc ?? vehicle.desc ?? vehicle.longDesc ?? "";

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <h1 className={styles.heading}>{vehicle.title}</h1>
            <p className={styles.copy}>{lead}</p>
            <div className={styles.btnContainer}>
              <Button href='/' text='Book your ride' btnType='yellow' arrow />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.imgContainer}>
              <Image src={heroImg} alt={heroAlt} fill className={styles.img} />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
