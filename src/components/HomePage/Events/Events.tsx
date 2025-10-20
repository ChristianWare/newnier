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
import Img1 from "../../../../public/images/john.jpg";
import Img2 from "../../../../public/images/jazz.jpg";
import Img3 from "../../../../public/images/rock.jpg";
import Img4 from "../../../../public/images/food.jpg";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

const data = [
  {
    id: 1,
    title: "John Legend Concert",
    description:
      "A concert featuring the music of John Legend. Enjoy an unforgettable night with soulful performances and captivating melodies.",
    date: "2025-11-01",
    src: Img1,
  },
  {
    id: 2,
    title: "Jazz Night",
    description:
      "An evening of smooth jazz music. Experience talented musicians and a relaxing atmosphere perfect for music lovers.",
    date: "2025-12-01",
    src: Img2,
  },
  {
    id: 3,
    title: "Rock Festival",
    description:
      "A festival featuring various rock bands. Join the crowd for high-energy performances and an electrifying ambiance.",
    date: "2026-01-15",
    src: Img3,
  },
  {
    id: 4,
    title: "Food Festival",
    description:
      "A festival celebrating various cuisines. Taste dishes from around the world and enjoy live cooking demonstrations.",
    date: "2026-02-20",
    src: Img4,
  },
];

export default function Events() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <SectionHeading text='Local Events' />

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
              {data.map((event) => (
                <div key={event.id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <div className={styles.dateContainer}>
                      <SectionHeading text={event.date} />
                    </div>
                    <div className={styles.imgContainer}>
                      <Image
                        src={event.src}
                        alt={event.title}
                        fill
                        className={styles.img}
                      />
                    </div>
                  </div>
                  <div className={styles.cardRight}>
                    <div className={styles.meta}>
                      <h4 className={styles.title}>{event.title}</h4>
                      <p className={styles.desc}>{event.description}</p>
                    </div>
                    <div className={styles.circlBtnContainer}>
                      <Button btnType='arrowBtn' arrow href='/' />
                    </div>
                    <div className={styles.btnContainerii}>
                      <Button
                        href='/'
                        text='More details'
                        btnType='navGray'
                        arrow
                      />
                    </div>
                  </div>
                </div>
              ))}
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
