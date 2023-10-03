import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button text="See my works" url="portfolio" />
      </div>
      <div className={styles.item}>
        <Image
          width={1000}
          height={1000}
          className={styles.image}
          src="/home3.png"
          alt="home picture"
        />
      </div>
    </div>
  );
}
