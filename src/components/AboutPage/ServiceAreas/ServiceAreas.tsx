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
import Chandler from "../../../../public/images/chandler.jpg";
import Gilbert from "../../../../public/images/gilbert.webp";
import Tucson from "../../../../public/images/tucson.webp";
import Flagstaff from "../../../../public/images/flagstaff.jpg";
import Yuma from "../../../../public/images/yuma.jpg";
import Prescott from "../../../../public/images/prescott.webp";
import Lake from "../../../../public/images/lake.jpg";
import Sedona from "../../../../public/images/sedona.jpg";
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
  {
    id: 16,
    city: "Chandler",
    desc: "A growing tech and business center with family neighborhoods, parks, and a lively downtown.",
    src: Chandler,
  },
  {
    id: 17,
    city: "Gilbert",
    desc: "Known for excellent schools, family-friendly suburbs, and a charming downtown light rail corridor.",
    src: Gilbert,
  },
  {
    id: 18,
    city: "Tucson",
    desc: "Southern Arizona's cultural hub with a rich history, the University of Arizona, and desert scenery.",
    src: Tucson,
  },
  {
    id: 19,
    city: "Flagstaff",
    desc: "A mountain town near the Grand Canyon with outdoor recreation, skiing, and a cool pine-forest climate.",
    src: Flagstaff,
  },
  {
    id: 20,
    city: "Yuma",
    desc: "Southwestern city on the Colorado River, known for winter sunshine, agriculture, and historic sites.",
    src: Yuma,
  },
  {
    id: 21,
    city: "Prescott",
    desc: "Historic downtown, Whiskey Row, and access to forests and lakes make Prescott a popular mountain escape.",
    src: Prescott,
  },
  {
    id: 22,
    city: "Lake Havasu City",
    desc: "Famous for its lake recreation, boating, and the London Bridge attraction.",
    src: Lake,
  },

  {
    id: 24,
    city: "Sedona",
    desc: "Renowned for red-rock formations, hiking, vortex sites, and a thriving arts community.",
    src: Sedona,
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
