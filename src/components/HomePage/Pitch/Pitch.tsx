import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Pitch.module.css";
import Digital from "@/components/shared/Digital/Digital";
import Clock from "@/components/icons/Clock/Clock";
import Money from "@/components/icons/Money/Money";
import Support from "@/components/icons/Support/Support";
import Multiple from "@/components/icons/Multiple/Multiple";

const data = [
  {
    title: "Proven Punctuality",
    description:
      "We maintain a 100% on-time arrival rate—audited quarterly by an independent firm to ensure you’re never left waiting.",
    icon: <Clock className={styles.icon} />,
  },
  {
    title: "Flat-Rate Pricing",
    description:
      "Enjoy fully transparent, all-inclusive flat-rate pricing with no surge fees, hidden charges, or surprise add-ons.",
    icon: <Money className={styles.icon} />,
  },
  {
    title: "Rapid Response Support",
    description:
      "Our dedicated customer-Coge team answers every inquiry within seven minutes, 24/7—so you always have real-time assistance.",
    icon: <Support className={styles.icon} />,
  },
  {
    title: "Certified Chauffeurs",
    description:
      "All of our chauffeurs undergo thorough background checks and hold commercial licenses with annual defensive-driving recertifications.",
    icon: <Multiple className={styles.icon} />,
  },
];

export default function Pitch() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.digitalBox}>
            <Digital size='large' />
          </div>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              Why Ride with <span className={styles.spanImage} />
              <br className={styles.br} /> Nier Transportation?
            </h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.mapData}>
              {data.map((x, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.iconBox}>{x.icon}</div>
                  <h3 className={styles.title}>{x.title}</h3>
                  <p className={styles.desc}>{x.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
