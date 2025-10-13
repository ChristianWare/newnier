"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Testimonials.module.css";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Image from "next/image";
import { reviews } from "@/lib/data";
import Digital from "@/components/shared/Digital/Digital";
import Arrow from "@/components/icons/Arrow/Arrow";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const len = reviews.length;

  const go = useCallback(
    (n: number) => {
      setIdx((prev) => (prev + n + len) % len);
    },
    [len]
  );

  const goTo = useCallback(
    (n: number) => {
      if (n < 0 || n >= len) return;
      setIdx(n);
    },
    [len]
  );

  const onPrev = useCallback(() => go(-1), [go]);
  const onNext = useCallback(() => go(1), [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext]);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const r = reviews[idx];

  return (
    <section
      className={styles.container}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <LayoutWrapper>
        <SectionHeading text='Testimonials' color='tan' />
        <br />
        <br />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.reviewContent} key={r.id}>
              <p className={styles.copy}>&ldquo;{r.review}&rdquo;</p>
              <div className={styles.metaRow}>
                <em className={styles.reviewer}>
                  - {r.reviewer}, {r.company}
                </em>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.imgContainer}>
              <div className={styles.digitalBox}>
                <Digital size='large' color='black' />
              </div>
              <Image
                src={r.person}
                alt={r.reviewer}
                fill
                className={styles.img}
              />
            </div>
            <br />
            <br />
            <div className={styles.box}>
              <div className={styles.counter}>
                {idx + 1} / {len}
              </div>
              <br />
              <div className={styles.dots}>
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to review ${i + 1}`}
                    className={`${styles.dot} ${
                      i === idx ? styles.dotActive : ""
                    }`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <div className={styles.navContainer}>
                <button
                  className={styles.arrowBoxLeft}
                  aria-label='Previous review'
                  onClick={onPrev}
                >
                  <Arrow className={styles.icon} />
                </button>
                <button
                  className={styles.arrowBoxRight}
                  aria-label='Next review'
                  onClick={onNext}
                >
                  <Arrow className={styles.icon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
