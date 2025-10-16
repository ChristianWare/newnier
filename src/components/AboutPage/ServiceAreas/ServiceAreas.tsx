/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServiceAreas.module.css";
import Image from "next/image";

import ImgScottsdale from "../../../../public/images/scottsdaleii.jpg";
import ImgPhoenix from "../../../../public/images/phoenixii.jpg";
import ImgMesa from "../../../../public/images/mesaii.jpg";
import ImgTempe from "../../../../public/images/tempe.jpg";
import ImgWestValley from "../../../../public/images/westValleyiii.jpg";
import ImgCasaGrande from "../../../../public/images/casaGrandeii.jpg";
import ImgMaricopa from "../../../../public/images/maricopaii.jpg";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

const data = [
  {
    id: 7,
    city: "Scottsdale",
    desc: "Scottsdale is known for its vibrant arts scene, upscale shopping, and stunning desert landscapes.",
    src: ImgScottsdale,
  },
  {
    id: 8,
    city: "Phoenix",
    desc: "The state's capital and largest city, offering a diverse cultural scene, desert botanical gardens, and outdoor adventures.",
    src: ImgPhoenix,
  },
  {
    id: 9,
    city: "Mesa",
    desc: "Mesa boasts a rich history, with the Mesa Arts Center and a thriving downtown area, making it a hub for arts and culture.",
    src: ImgMesa,
  },
  {
    id: 10,
    city: "Tempe",
    desc: "Home to Arizona State University, combines a lively college atmosphere with recreation along Tempe Town Lake.",
    src: ImgTempe,
  },
  {
    id: 13,
    city: "West Valley",
    desc: "Avondale, Goodyear, Buckeye, Surprise, Glendale, Tolleson, and Peoria—suburban living with easy recreation.",
    src: ImgWestValley,
  },
  {
    id: 14,
    city: "Casa Grande",
    desc: "Casa Grande, home of Lucid Motors, features the Casa Grande Ruins National Monument and a welcoming community.",
    src: ImgCasaGrande,
  },
  {
    id: 15,
    city: "Maricopa",
    desc: "Maricopa is a fast‑growing, family‑friendly city set against the natural beauty of the Sonoran Desert.",
    src: ImgMaricopa,
  },
];

export default function ServiceAreas() {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.dataset.index = String(i);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container} ref={containerRef}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <SectionHeading text='Areas we services' />
            <h2 className={styles.heading}>
              Serving the <br className={styles.br} />
              Phoenix metropolitan area
            </h2>
            <p className={styles.copy}>
              Need to go somewhere outside our service area? We&lsquo;ll get you
              there, too.
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.sticky}>
                <div className={styles.imgBox} ref={stickyRef}>
                  <Image
                    src={data[active].src}
                    alt={data[active].city}
                    fill
                    priority
                    className={styles.img}
                  />
                </div>
              </div>
            </div>

            <div className={styles.right}>
              {data.map((city, i) => (
                <div
                  key={city.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`${styles.card} ${
                    i === active ? styles.activeCard : ""
                  }`}
                >
                  <div className={styles.imgMobile}>
                    <Image
                      src={city.src}
                      alt={city.city}
                      fill
                      priority
                      className={styles.imgii}
                    />
                  </div>
                  <h3 className={`${styles.city} h5`}>{city.city}</h3>
                  <p className={styles.desc}>{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
