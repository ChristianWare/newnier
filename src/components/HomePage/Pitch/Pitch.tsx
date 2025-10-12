import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Pitch.module.css";
import Digital from "@/components/shared/Digital/Digital";
import Clock from "@/components/icons/Clock/Clock";
import Support from "@/components/icons/Support/Support";
import Driver from "@/components/icons/Driver/Driver";
import Luxury from "@/components/icons/Luxury/Luxury";

const data = [
  {
    title: "Punctual—Guaranteed",
    description:
      "We back every airport pickup with a 15‑minute on‑time guarantee or the first hour is free.",
    icon: <Clock className={styles.icon} />,
  },
  {
    title: "Professional Chauffeurs",
    description:
      "Uniformed, background‑checked, trained in discreet service and desert driving.",
    icon: <Driver className={styles.icon} />,
  },
  {
    title: "Luxury Fleet",
    description:
      "Late‑model sedans, SUVs, Sprinters, and party buses maintained above DOT standards.",
    icon: <Luxury className={styles.icon} />,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Always available for booking changes, questions, or last-minute requests—day or night.",
    icon: <Support className={styles.icon} />,
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
