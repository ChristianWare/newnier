import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AddOns.module.css";
import Button from "@/components/shared/Button/Button";

const data = [
  {
    id: 1,
    title: "Sign up for classes",
    description:
      "Choose your course and register online quickly and hassle-free",
  },
  {
    id: 2,
    title: "Learn from experts",
    description:
      "Get professional driving lessons with instructors tailored to your pace",
  },
  {
    id: 3,
    title: "Practice on the road",
    description:
      "Build your skills with supervised driving practice in real traffic conditions",
  },
  {
    id: 4,
    title: "Pass your test",
    description:
      "Prepare thoroughly and ace your driving exam with our full support",
  },
];

export default function AddOns() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={`${styles.heading} h3`}>
              Learn to drive with confidence, easy steps to your license
            </h2>
            <div className={styles.btnContainer}>
              <Button href='/' text='Book your ride' btnType='yellow' arrow />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.mapDataContainer}>
              {data.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <div className={styles.id}>0{item.id}.</div>
                  </div>
                  <div className={styles.cardRight}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.desc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.btnContainerii}>
              <Button href='/' text='Book your ride' btnType='yellow' arrow />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
