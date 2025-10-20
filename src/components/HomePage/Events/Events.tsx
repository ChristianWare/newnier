import styles from "./Events.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Cog from "@/components/icons/Cog/Cog";
import Deposit from "@/components/icons/Deposit/Deposit";
import Multiple from "@/components/icons/Multiple/Multiple";
import Rebooking from "@/components/icons/Rebooking/Rebooking";
import Support from "@/components/icons/Support/Support";
import Hosting from "@/components/icons/Hosting/Hosting";
import Stariii from "@/components/icons/Stariii/Stariii";
import Button from "@/components/shared/Button/Button";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type EventPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  eventDate?: string;
  coverImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
};

async function getThisMonthsEventPosts(): Promise<EventPost[]> {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const startStr = start.toISOString().slice(0, 10); // YYYY-MM-DD
  const endStr = end.toISOString().slice(0, 10); // YYYY-MM-DD

  const query = `
    *[
      _type == "post" &&
      (
        "events" in tags[]->slug.current ||
        "events" in tags
      ) &&
      coalesce(eventDate, publishedAt) >= $startStr &&
      coalesce(eventDate, publishedAt) < $endStr
    ] | order(coalesce(eventDate, publishedAt) asc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      eventDate,
      coverImage{asset, alt, _type}
    }
  `;

  return client.fetch(
    query,
    { startStr, endStr },
    { next: { revalidate: 60 } }
  );
}

export default async function Events() {
  const posts = await getThisMonthsEventPosts();

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <SectionHeading text='Local Events for this month' />
            <div className={styles.iconContainer}>
              <Stariii className={styles.icon} />
              <Cog className={styles.icon} />
              <Deposit className={styles.icon} />
              <Multiple className={styles.icon} />
              <Rebooking className={styles.icon} />
              <Support className={styles.icon} />
              <Hosting className={styles.icon} />
            </div>
            <h3 className={styles.heading}>
              We provide transportation to all <br className={styles.br} />{" "}
              upcoming events in Phoenix and Beyond
            </h3>
          </div>

          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {posts.map((event) => {
                const dateSource = event.eventDate ?? event.publishedAt;
                const dateStr = dateSource?.slice(0, 10);
                const img = event.coverImage
                  ? urlFor(event.coverImage)
                      .width(1200)
                      .height(800)
                      .fit("crop")
                      .url()
                  : undefined;

                return (
                  <div key={event._id} className={styles.card}>
                    <div className={styles.cardLeft}>
                      <div className={styles.dateContainer}>
                        <SectionHeading text={dateStr} />
                      </div>
                      <div className={styles.imgContainer}>
                        {img && (
                          <Image
                            src={img}
                            alt={event.coverImage?.alt || event.title}
                            fill
                            className={styles.img}
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.cardRight}>
                      <div className={styles.meta}>
                        <h4 className={styles.title}>{event.title}</h4>
                        {event.excerpt ? (
                          <p className={styles.desc}>{event.excerpt}</p>
                        ) : null}
                      </div>
                      <div className={styles.circlBtnContainer}>
                        <Button
                          btnType='arrowBtn'
                          arrow
                          href={`/blog/${event.slug.current}`}
                        />
                      </div>
                      <div className={styles.btnContainerii}>
                        <Button
                          href={`/blog/${event.slug.current}`}
                          text='More details'
                          btnType='navGray'
                          arrow
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.btnContainer}>
              <Button
                href='/blog?tag=events'
                text='See all events'
                btnType='black'
                arrow
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
