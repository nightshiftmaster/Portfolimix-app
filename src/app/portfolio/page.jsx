import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";

export const metadata = {
  title: "Portfolio",
  description: "This is Portfolio page",
};

const pages = ["illustrations", "websites", "applications"];

const Portfolio = async () => {
  if (!BASE_API_URL) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a galery</h1>
      <div className={styles.items}>
        {pages.map((page) => {
          return (
            <Link
              rel="preload"
              href={`${BASE_API_URL}/portfolio/${page}`}
              className={styles.item}
              load="late"
            >
              <span className={styles.title}>{page}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
