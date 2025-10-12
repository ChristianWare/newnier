// components/DigitalImages/DigitalImages.tsx
import styles from "./DigitalImages.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/road.jpg";
import Img2 from "../../../../public/images/westValleyiii.jpg";
import Img3 from "../../../../public/images/westValleyii.jpg";
import Img4 from "../../../../public/images/westValley.jpg";
import Img5 from "../../../../public/images/sand.jpg";
import Img6 from "../../../../public/images/scottsdale.jpg";
import Img7 from "../../../../public/images/scottsdaleii.jpg";

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7];

// 1-based nodes: 1,3,6,8,9,11,14  →  0-based indices:
const FILLED_INDICES = [0, 2, 5, 7, 8, 10, 13];

export default function DigitalImages() {
  // Pre-map target indices → image
  const indexToImage = new Map<number, (typeof images)[number]>();
  FILLED_INDICES.forEach((idx, i) => {
    if (i < images.length) indexToImage.set(idx, images[i]);
  });

  return (
    <div className={styles.container}>
      {Array.from({ length: 16 }).map((_, i) => {
        const img = indexToImage.get(i);
        return (
          <div key={i} className={styles.node}>
            {img && (
              <Image
                src={img}
                alt={`Grid image ${FILLED_INDICES.indexOf(i) + 1}`}
                fill
                sizes='80px'
                className={styles.img}
                priority={i === FILLED_INDICES[0]}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
