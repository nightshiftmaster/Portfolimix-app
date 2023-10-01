import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>All rights reserved</div>
      <div>
        <Image src="" alt="My website" />
      </div>
    </div>
  );
};

export default Footer;
