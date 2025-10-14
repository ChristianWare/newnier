"use client";

import styles from "./HorizontalScroll.module.css";
import Image from "next/image";
import { useMemo } from "react";
import { services } from "@/lib/data";

export default function HorizontalScroll() {
  const loopedServices = useMemo(() => [...services, ...services], []);
  return (
    <div className={styles.container}>
      <div className={styles.track} aria-hidden='true'>
        {loopedServices.map((service, idx) => (
          <div className={styles.imgContainer} key={`${service.id}-${idx}`}>
            <Image
              src={service.src}
              width={300}
              height={300}
              alt={service.title}
              className={styles.img}
              priority={idx < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
