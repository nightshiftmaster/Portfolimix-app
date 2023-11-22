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
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a galery</h1>
      <div className={styles.items} data-testid="pages">
        {pages.map((page, i) => {
          return (
            <Link
              href={`${BASE_API_URL}/portfolio/${page}`}
              className={styles.item}
              key={i}
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
