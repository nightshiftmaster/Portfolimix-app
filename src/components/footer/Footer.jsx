import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container} data-testid="footer">
      <div className={styles.date}>@2023 All rights reserved</div>
      <div className={styles.social}>
        <Link href="https://github.com/nightshiftmaster">
          <Image width={21} height={21} src="/github.png" alt="github icon" />
        </Link>

        <Link href="https://www.linkedin.com/in/vlad-medvedev-069b6425b/">
          <Image
            width={22}
            height={22}
            src="/linkedin.png"
            alt="linkedin icon"
          />
        </Link>

        <Link href="https://www.facebook.com/profile.php?id=1198533625&locale=he_IL">
          <Image
            width={20}
            height={20}
            className={styles.icon}
            src="/facebook.png"
            alt="facebook icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
