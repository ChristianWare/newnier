import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutUsIntro.module.css";

import Cog from "@/components/icons/Cog/Cog";
import Deposit from "@/components/icons/Deposit/Deposit";
import Multiple from "@/components/icons/Multiple/Multiple";
import Rebooking from "@/components/icons/Rebooking/Rebooking";
import Support from "@/components/icons/Support/Support";
import Hosting from "@/components/icons/Hosting/Hosting";
import Stariii from "@/components/icons/Stariii/Stariii";
import CountUp from "@/components/shared/CountUp/CountUp";
import Logo from "@/components/shared/Logo/Logo";

const data = [
  { id: 1, number: "22", detail: "Years of Experience" },
  { id: 2, number: "40k", detail: "Hours on the road" },
  { id: 3, number: "25k", detail: "Happy clients" },
  { id: 4, number: "100%", detail: "Satisfaction Guarantee" },
];

function parseStat(str: string): { value: number; suffix: string } {
  // Matches leading numeric (int/float) and trailing non-numeric suffix
  const m = str.trim().match(/^(\d+(?:\.\d+)?)([a-zA-Z%+]+)?$/);
  const raw = m ? Number(m[1]) : Number(str) || 0;
  const suffix = m?.[2] ?? "";

  // For abbreviations like "k" we just keep the suffix and animate the base (e.g., 40 + "k")
  return { value: raw, suffix };
}

export default function AboutUsIntro() {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <Logo className={styles.logo} />
            <div className={styles.iconContainer}>
              <Stariii className={styles.icon} />
              <Cog className={styles.icon} />
              <Deposit className={styles.icon} />
              <Multiple className={styles.icon} />
              <Rebooking className={styles.icon} />
              <Support className={styles.icon} />
              <Hosting className={styles.icon} />
            </div>
            <h3 className={styles.heading}>
              With a passion <span className={styles.spanImage} /> for providing
              the best car service in the Phoenix Metro area, we‘ve been serving
              the Arizona community <span className={styles.spanImage} /> for
              20+ years.
            </h3>
          </div>

          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {data.map((item) => {
                const { value, suffix } = parseStat(item.number);
                return (
                  <div key={item.id} className={styles.card}>
                    <h4 className={`${styles.number} stat`}>
                      <CountUp
                        from={0}
                        to={value}
                        duration={1.2}
                        separator=','
                        className={styles.count}
                      />
                      {suffix && (
                        <span className={styles.suffix}>{suffix}</span>
                      )}
                    </h4>
                    <p className={styles.detail}>{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
