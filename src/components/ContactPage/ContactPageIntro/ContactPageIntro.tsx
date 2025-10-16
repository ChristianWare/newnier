import styles from "./ContactPageIntro.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Suburban from "../../../../public/images/taho.png";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

export default function ContactPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <SectionHeading text='Contact' />
            <h1 className={styles.heading}>Lets Get In touch</h1>
            <h2 className={`${styles.heading2} h6`}>
              Talk to a Real Dispatcher—24/7/365
            </h2>
            <p className={styles.copy}>
              Whether you prefer to speak with a human or type a quick message,
              our locally based support team is always on duty. Expect clear
              answers, honest pricing, and zero phone-tree frustration.
            </p>
            <div className={styles.imgContainer}>
              <Image
                src={Suburban}
                fill
                alt=''
                title=''
                className={styles.img}
                priority
                loading='eager'
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
