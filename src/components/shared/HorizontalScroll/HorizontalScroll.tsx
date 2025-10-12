"use client";

import styles from "./HorizontalScroll.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { services } from "@/lib/data";

const loopedServices = [...services, ...services];

export default function HorizontalScroll() {
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollTrack}>
        {loopedServices.map((service, idx) => (
          <div className={styles.imgContainer} key={`${service.id}-${idx}`}>
            <Image
              src={service.src}
              width={300}
              height={300}
              alt={service.title}
              className={styles.img}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
