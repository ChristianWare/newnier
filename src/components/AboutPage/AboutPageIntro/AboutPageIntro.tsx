import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutPageIntro.module.css";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import DigitalImages from "@/components/shared/DigitalImages/DigitalImages";

export default function AboutPageIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.digitalBox}>
        <DigitalImages />
      </div>
      <div className={styles.digitalBoxii}>
        <DigitalImages />
      </div>
      <LayoutWrapper>
        <div className={styles.content}>
          <SectionHeading text='About Us' />
          <h1 className={styles.heading}>
            {/* Discover the story behind Nier Transportation and our mission to connect travelers with unforgettable experiences. */}
            Who we are <br className={styles.br} />
            and what drives us
          </h1>
          <p className={styles.copy}>
            At Nier Transportation, we are passionate about connecting travelers
            with unforgettable experiences.
            {/* Our mission is to provide reliable,
            comfortable, and affordable transportation services that make every
            journey memorable. */}
            {/* Whether you're exploring new destinations or returning home, we are dedicated to ensuring your travel experience is seamless and enjoyable. */}
          </p>
        </div>
      </LayoutWrapper>
    </div>
  );
}
