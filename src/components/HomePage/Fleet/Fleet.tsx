import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Fleet.module.css";
import Image from "next/image";
import Suburban from "../../../../public/images/taho.png";
import Escalade from "../../../../public/images/escalade.avif";
import Sprinter from "../../../../public/images/sprinter.png";
import MercedesSedan from "../../../../public/images/mercedesSedan.avif";
import PartyBus from "../../../../public/images/partyBusii.png";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Button from "@/components/shared/Button/Button";
import Digital from "@/components/shared/Digital/Digital";

const data = [
  {
    id: 1,
    title: "Chevy Suburban",
    seats: "7 seater",
    cargo: "144.7 cu ft",
    desc: "Our flagship full-size SUV pairs tri-zone climate control with class-leading leg- and luggage-room—perfect for families or small groups.",
    src: Suburban,
  },
  {
    id: 2,
    title: "Cadillac Escalade ESV",
    seats: "6 seater",
    cargo: "121 cu ft",
    desc: "The pinnacle of luxury SUVs—premium leather, rear captain’s chairs, and magnetic ride control for a first-class travel experience.",
    src: Escalade,
  },
  {
    id: 3,
    title: "Mercedes-Benz Sprinter (Executive)",
    seats: "14 seater",
    cargo: "Up to 532 cu ft",
    desc: "Lounge-style cabin with stand-up headroom, USB-C charging at every seat, and onboard Wi-Fi—ideal for corporate teams and golf outings.",
    src: Sprinter,
  },
  {
    id: 4,
    title: "Mercedes-Benz E-Class Sedan",
    seats: "3 seater",
    cargo: "19 cu ft",
    desc: "A refined executive sedan for solo travelers or couples who value discreet style, quiet comfort, and advanced safety tech.",
    src: MercedesSedan,
  },
  {
    id: 5,
    title: "Mini Party Bus",
    seats: "20 seater",
    cargo: "Ample cabin storage",
    desc: "Color-changing LED lights, Bluetooth sound, and wrap-around seating keep the celebration rolling from door to door.",
    src: PartyBus,
  },
];

export default function Fleet() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.top}>
          <h2 className={styles.heading}>Meet the Fleet</h2>
          <p className={styles.copy}>
            Choose from executive sedans with cold bottled water and phone
            chargers, sleek SUVs that swallow six roller bags, or luxury
            sprinter vans with Wi-Fi and conference seating. Each vehicle is
            sanitized before every trip and inspected weekly by our in-house
            mechanic.
          </p>
        </div>
        <div className={styles.content}>
          {data.map((x) => (
            <div className={styles.card} key={x.id}>
              <div className={styles.digitalBox}>
                <Digital />
              </div>
              <div className={styles.left}>
                <SectionHeading text='Available' />
                <div className={styles.imgContainer}>
                  <Image
                    src={x.src}
                    fill
                    alt=''
                    title=''
                    className={styles.img}
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.featureContainer}>
                  <h3 className={styles.title}>{x.title}</h3>{" "}
                </div>
                <div className={styles.featureContainer}>
                  <p className={styles.detail}>{x.desc}</p>
                </div>
                <div className={styles.featureContainer}>
                  <span className={styles.feature}>Seats:</span>
                  <p className={styles.detail}>{x.seats}</p>
                </div>
                <div className={styles.featureContainer}>
                  <span className={styles.feature}>Cargo:</span>
                  <p className={styles.detail}>{x.cargo}</p>
                </div>
                {/* <div className={styles.featureContainer}>
                  <span className={styles.feature}>Details:</span>
                </div> */}
                <div className={styles.btnContainer}>
                  <Button
                    href='/'
                    target='_blank'
                    btnType='black'
                    text='Book Now'
                    arrow
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
