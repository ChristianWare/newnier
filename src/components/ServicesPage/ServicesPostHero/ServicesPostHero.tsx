import LayoutWrapper from '@/components/shared/LayoutWrapper'
import styles from './ServicesPostHero.module.css'
import Button from '@/components/shared/Button/Button';
import CountUp from '@/components/shared/CountUp/CountUp';

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


export default function ServicesPostHero() {
  return (
    <div className={styles.container}>
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