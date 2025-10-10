import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Pitch.module.css";
import Digital from "@/components/shared/Digital/Digital";
import Cog from "@/components/icons/Cog/Cog";
import Car from "@/components/icons/Car/Car";
import Calendar from "@/components/icons/Calendar/Calendar";
import Multiple from "@/components/icons/Multiple/Multiple";

const data = [
  {
    id: 1,
    icon: <Cog className={styles.icon} />,
    title: "Airport Transfers",
    description:
      "Business travelers rely on us for seamless Sky Harbor pickups and drop-offs, complete with real-time flight monitoring and 60 minutes of complimentary wait time.",
  },
  {
    id: 2,
    icon: <Car className={styles.icon} />,
    title: "Corporate Roadshows",
    description:
      "Keep your executives on schedule with door-to-door service between meetings, including printed receipts and chilled bottled water onboard.",
  },
  {
    id: 3,
    icon: <Calendar className={styles.icon} />,
    title: "Special Events",
    description:
      "From weddings to stadium games, we eliminate the parking headache—add meet-and-greet signage or champagne service for a memorable arrival.",
  },
  {
    id: 4,
    icon: <Multiple className={styles.icon} />,
    title: "Weekend Getaways",
    description:
      "Families and groups book round-trip excursions to Sedona, Flagstaff, and beyond with flat-rate mileage pricing—no hidden fuel surcharges or surprise fees.",
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
              Popular Routes <span className={styles.spanImage} />
              <br className={styles.br} /> & Use-Cases
            </h2>
          </div>
          <div className={styles.bottom}></div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
