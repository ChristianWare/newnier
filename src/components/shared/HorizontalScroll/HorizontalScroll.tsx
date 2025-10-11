"use client";

import styles from "./HorizontalScroll.module.css";
import Image from "next/image";
import Arrow from "@/components/icons/Arrow/Arrow";
import { useRef, useEffect } from "react";
import { services } from "@/lib/data";
import Link from "next/link";

const loopedServices = [...services, ...services];

export default function HorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.scrollTrack} ref={trackRef}>
        {loopedServices.map((service, idx) => (
          <div className={styles.imgContainer} key={`${service.id}-${idx}`}>
            <Arrow className={styles.icon} />
            <Link href={`/services/${service.slug}`}>
              <Image
                src={service.src}
                width={300}
                height={300}
                alt={service.title}
                className={styles.img}
              />
            </Link>
            <h3 className={styles.service}>{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
