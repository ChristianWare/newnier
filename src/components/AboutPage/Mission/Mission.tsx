import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Mission.module.css";
import Button from "@/components/shared/Button/Button";
import Saftey from "@/components/icons/Saftey/Saftey";
import Clock from "@/components/icons/Clock/Clock";
import Luxury from "@/components/icons/Luxury/Luxury";

const values = [
  {
    id: 1,
    title: "Safety First",
    description:
      "Your well-being is our top priority. We maintain rigorous safety standards and ensure all vehicles are regularly inspected and sanitized for your peace of mind.",
    icon: <Saftey className={styles.icon} />,
  },
  {
    id: 2,
    title: "Punctuality",
    description:
      "We value your time. Our team is committed to prompt arrivals and efficient service, ensuring you reach your destination on schedule, every time.",
    icon: <Clock className={styles.icon} />,
  },
  {
    id: 3,
    title: "Exceptional Service",
    description:
      "We go above and beyond to deliver a seamless and memorable experience, focusing on professionalism, courtesy, and attention to every detail.",
    icon: <Luxury className={styles.icon} />,
  },
];

export default function Mission() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <h2 className={styles.heading}>
                Seamless bookings. <br className={styles.br} /> Unforgettable
                rides.
              </h2>
              <p className={styles.copy}>
                Our mission is to provide a seamless booking experience that
                allows our clients to focus on what truly matters – their
                journey. We strive to exceed expectations and deliver
                unforgettable experiences with every ride.
              </p>
            </div>
            <div className={styles.topRight}>
              <div className={styles.btnClusterContainer}>
                <Button href='/' text='Book your ride' btnType='black' arrow />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {values.map((value) => (
                <div key={value.id} className={styles.card}>
                  <span className={styles.iconHeadingBox}>
                    {value.icon}
                    <h3 className={`${styles.title} h5`}>{value.title}</h3>
                  </span>
                  <p className={styles.desc}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
