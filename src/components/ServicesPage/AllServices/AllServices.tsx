import styles from "./AllServices.module.css";
import { services } from "@/lib/data";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Digital from "@/components/shared/Digital/Digital";
import Cog from "@/components/icons/Cog/Cog";

export default function AllServices() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.top}>
          <h3 className={styles.heading}>
            With a passion <span className={styles.spanImage} /> for providing
            the best car service in the Phoenix Metro area, we‘ve been serving
            the Arizona community <span className={styles.spanImage} /> for 20+
            years.
          </h3>
        </div>
        <div className={styles.bottom}>
          {services.map((x) => (
            <div key={x.id} className={styles.card}>
              <div className={styles.digitalBox}>
                <Digital />
              </div>
              <div className={styles.cardTop}>
                <h3 className={`${styles.title} h5`}>{x.title}</h3>
                <Cog className={styles.icon} />
              </div>
              <div>
                <p className={styles.desc}>{x.copy}</p>
                <div className={styles.btnContainer}>
                  <Button
                    text='Learn More'
                    btnType='navBlack'
                    href={`/services/${x.slug}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
