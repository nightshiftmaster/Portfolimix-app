import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ text, url }) => (
  <Link rel="preload" href={url}>
    <div className={styles.container}>{text}</div>
  </Link>
);
export default Button;
