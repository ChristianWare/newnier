"use client";

import React from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServiceDetails.module.css";
import { services } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";

type Service = (typeof services)[number];

function SectionList({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items?: ReadonlyArray<string>;
  ordered?: boolean;
}) {
  if (!items || items.length === 0) return null;
  const ListTag = ordered ? "ol" : "ul";
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{title}</h3>
      <ListTag className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ListTag>
    </section>
  );
}

function SectionFAQs({
  title,
  faqs,
}: {
  title: string;
  faqs?: ReadonlyArray<{ q: string; a: string }>;
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{title}</h3>
      <div className={styles.faqGroup}>
        {faqs.map((f, i) => (
          <details key={i} className={styles.faq}>
            <summary className={styles.faqQ}>{f.q}</summary>
            <p className={styles.faqA}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ServiceDetails({ service }: { service: Service }) {
  if (!service) {
    return (
      <section className={styles.container}>
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
      <LayoutWrapper>
        {/* Top: Overview + Feature cards */}
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={`${styles.heading} h3`}>Service overview</h2>
            {service.description && (
              <p className={styles.desc}>{service.description}</p>
            )}
            {service.src2 && (
              <div className={styles.imgContainer}>
                <Image
                  src={service.src2}
                  fill
                  alt={service.title || ""}
                  className={styles.img}
                />
              </div>
            )}
          </div>

          <div className={styles.right}>
            {service.features && service.features.length > 0 && (
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
            )}

            <div className={styles.btnClusterContainer}>
              <Button href='/' text='Book your ride' btnType='black' arrow />
            </div>
          </div>
        </div>

        {/* Full-width detail sections */}
        <div className={styles.details}>
          <SectionList
            title='Who this is for'
            items={service.whoThisIsFor as ReadonlyArray<string> | undefined}
          />
          <SectionList
            title='Coverage & Airports'
            items={
              service.coverageAndAirports as ReadonlyArray<string> | undefined
            }
          />
          <SectionList
            title='What’s included'
            items={service.whatsIncluded as ReadonlyArray<string> | undefined}
          />
          <SectionList
            title='Vehicle classes'
            items={service.vehicleClasses as ReadonlyArray<string> | undefined}
          />
          <SectionList
            title='Pickup options'
            items={service.pickupOptions as ReadonlyArray<string> | undefined}
          />
          <SectionList
            title='Booking & Payment'
            items={
              service.bookingAndPayment as ReadonlyArray<string> | undefined
            }
          />
          <SectionList
            title='Policies'
            items={service.policies as ReadonlyArray<string> | undefined}
          />

          <SectionList
            title='Families, Accessibility & Special Requests'
            items={
              service.familiesAccessibilitySpecial as
                | ReadonlyArray<string>
                | undefined
            }
          />

          <SectionList
            title='Safety & Standards'
            items={
              service.safetyAndStandards as ReadonlyArray<string> | undefined
            }
          />
          <SectionList
            title='Communication & Tracking'
            items={
              service.communicationAndTracking as
                | ReadonlyArray<string>
                | undefined
            }
          />

          <SectionList
            title='What to expect'
            items={service.whatToExpect as ReadonlyArray<string> | undefined}
            ordered
          />

          <SectionFAQs
            title='FAQs'
            faqs={
              service.faqs as
                | ReadonlyArray<{ q: string; a: string }>
                | undefined
            }
          />

          <SectionList
            title='Add-ons'
            items={service.addOns as ReadonlyArray<string> | undefined}
          />
          <SectionList
            title='For travel managers'
            items={
              service.forTravelManagers as ReadonlyArray<string> | undefined
            }
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
