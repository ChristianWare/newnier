import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FourThings.module.css";
import Digital from "@/components/shared/Digital/Digital";
import Button from "@/components/shared/Button/Button";

const data = [
  {
    id: 1,
    title: "Safety & Compliance",
    description:
      "Licensed, insured, and proactively maintained vehicles—driven by vetted, professionally trained chauffeurs.",
  },
  {
    id: 2,
    title: "Punctuality & Reliability",
    description:
      "Real-time flight and traffic monitoring, precise dispatching, and confirmed ETAs so you’re never left waiting.",
  },
  {
    id: 3,
    title: "Professionalism & Discretion",
    description:
      "Courteous, uniformed drivers who protect your privacy and represent you well at every pickup and drop-off.",
  },
  {
    id: 4,
    title: "Fleet Quality & Comfort",
    description:
      "Late-model sedans, SUVs, and Sprinters with clean interiors, climate control, charging, and luggage capacity that fits your trip.",
  },
];

export default function FourThings() {
  return (
    <section className={styles.container}>
      <div className={styles.digitalBox}>
        <Digital size='large' />
      </div>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={`${styles.heading} h3`}>
              The most important factors when choosing a car service for your
              next journey.
            </h2>
            <p className={styles.copy}>
              We deliver all four—every ride. With rigorous safety standards,
              flight-tracked punctuality, white-glove service, and a luxury
              fleet, choosing Nier is the easiest decision of your travel day.
            </p>
            <div className={styles.btnContainer}>
              <Button href='/' text='Book your ride' btnType='yellow' arrow />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.mapDataContainer}>
              {data.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={`${styles.index} h5`}>0{item.id}.</div>
                  <h3 className={`${styles.title} h5`}>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
