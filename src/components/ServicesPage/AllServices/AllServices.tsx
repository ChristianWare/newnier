import styles from "./AllServices.module.css";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Digital from "@/components/shared/Digital/Digital";
import Plane from "@/components/icons/Plane/Plane";
import Clock from "@/components/icons/Clock/Clock";
import Location from "@/components/icons/Location/Location";
import Business from "@/components/icons/Business/Business";
import Luxury from "@/components/icons/Luxury/Luxury";
import Party from "@/components/icons/Party/Party";
import Rebooking from "@/components/icons/Rebooking/Rebooking";
import LongDistance from "@/components/icons/LongDistance/LongDistance";
import Wedding from "@/components/icons/Wedding/Wedding";
import Golf from "@/components/icons/Golf/Golf";

const data = [
  {
    id: 1,
    title: "Airport Transfers",
    description:
      "Reliable black car service to Scottsdale, Sky Harbor, and Gateway airports. Professional chauffeurs ensure punctual, stress-free travel.",
    icon: <Plane className={styles.icon} />,
    slug: "airport-transfers",
  },
  {
    id: 2,
    title: "Hourly Chauffeur",
    description:
      "Keep a dedicated car and driver on standby for meetings, golf, or a night out; pay only for the hours you use.",
    icon: <Clock className={styles.icon} />,
    slug: "hourly-chauffeur",
  },
  {
    id: 3,
    title: "Point-to-Point City Transfers",
    description:
      "Direct, door-to-door rides across the Valley with fixed pricing and 15-minute courtesy wait time.",
    icon: <Location className={styles.icon} />,
    slug: "point-to-point",
  },
  {
    id: 4,
    title: "Golf Outing Transportation",
    description:
      "Stress-free rides to TPC, We-Ko Pa, Troon and other courses. Vehicles for any group size with knowledgeable local drivers.",
    icon: <Golf className={styles.icon} />,
    slug: "golf-outing-transportation",
  },
  {
    id: 5,
    title: "Corporate & Event Logistics",
    description:
      "VIP roadshows and conferences with onsite greeters, manifest tracking, and consolidated billing.",
    icon: <Business className={styles.icon} />,
    slug: "corporate-and-event-logistics",
  },
  {
    id: 6,
    title: "Special Events",
    description:
      "Arrive in style for any occasion. We provide luxury vehicles and shuttle buses to suit all group sizes and event types.",
    icon: <Luxury className={styles.icon} />,
    slug: "special-events",
  },
  {
    id: 7,
    title: "Party Bus",
    description:
      "Elevate your celebration with our premium party buses. Featuring spacious interiors, entertainment systems, and professional chauffeurs.",
    icon: <Party className={styles.icon} />,
    slug: "party-bus",
  },
  {
    id: 8,
    title: "Reoccurring Rides",
    description:
      "Dependable transportation for regular business needs. Scheduled rides ensure timely arrivals without ride-share uncertainties.",
    icon: <Rebooking className={styles.icon} />,
    slug: "reoccurring-rides",
  },
  {
    id: 9,
    title: "Long Distance Drives",
    description:
      "Comfortable intercity travel with professional drivers. Relax in our well-maintained vehicles while we handle the journey.",
    icon: <LongDistance className={styles.icon} />,
    slug: "long-distance-drives",
  },
  {
    id: 10,
    title: "Weddings",
    description:
      "LED lighting, Bluetooth sound, and wrap-around seating for unforgettable celebrations and seamless shuttles.",
    icon: <Wedding className={styles.icon} />,
    slug: "weddings",
  },
];

export default function AllServices() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.top}>
          <h3 className={styles.heading}>Services we offer</h3>
        </div>
        <div className={styles.bottom}>
          {data.map((x) => (
            <div key={x.id} className={styles.card}>
              <div className={styles.digitalBox}>
                <Digital />
              </div>
              <div className={styles.cardTop}>
                <h3 className={styles.title}>{x.title}</h3>
                <div className={styles.iconBox}>{x.icon}</div>
              </div>
              <div>
                <p className={styles.desc}>{x.description}</p>
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
