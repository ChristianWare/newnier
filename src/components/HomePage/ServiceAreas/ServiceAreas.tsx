import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ServiceAreas.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/phoenix.jpg";
import Button from "@/components/shared/Button/Button";
import Check from "@/components/icons/Check/Check";

export default function ServiceAreas() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LayoutWrapper>
            <div className={styles.leftContent}>
              <h2 className={styles.heading}>
                No matter where you are in the Phoenix area, our team is ready
                to provide top-notch service to enhance your travel experience.
              </h2>
              <p className={styles.copy}>
                We proudly serve the entire Phoenix metropolitan area, including
                but not limited to:
              </p>
              <ul className={styles.list}>
                <li>
                  <Check /> Phoenix
                </li>
                <li>
                  <Check /> Scottsdale
                </li>
                <li>
                  <Check /> Tempe
                </li>
                <li>
                  <Check /> Chandler
                </li>
                <li>
                  <Check /> Gilbert
                </li>
                <li>
                  <Check /> Peoria
                </li>
                <li>
                  <Check /> Glendale
                </li>
                <li>
                  <Check /> Surprise
                </li>
                <li>
                  <Check /> Avondale
                </li>
                <li>
                  <Check /> Goodyear
                </li>
                {/* <li>And surrounding communities</li> */}
              </ul>
              <div className={styles.btnContainer}>
                <Button href='/' text='Learn More about us' btnType='black' />
              </div>
            </div>
          </LayoutWrapper>
        </div>
        <div className={styles.right}>
          <div className={styles.imgContainer}>
            <Image src={Img1} alt='Phoenix' fill className={styles.img} />
          </div>
        </div>
      </div>
    </div>
  );
}
