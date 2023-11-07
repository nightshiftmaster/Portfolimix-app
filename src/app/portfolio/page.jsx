import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Portfolio",
  description: "This is Portfolio page",
};

const pages = ["illustrations", "websites", "applications"];

const Portfolio = async () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a galery</h1>
      <div className={styles.items}>
        {pages.map((page) => {
          return (
            <Link href={`portfolio/${page}`} className={styles.item}>
              <span className={styles.title}>{page}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
