import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

export default function Button({ text, url }) {
  return (
    <Link href={url}>
      <div className={styles.container}>{text}</div>
    </Link>
  );
}
