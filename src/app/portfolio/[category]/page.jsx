import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";

async function getData(category) {
  const res = await fetch(`${BASE_API_URL}/api/works/${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.category);
  return {
    title: post.title,
    description: post.desc,
  };
}

const Category = async ({ params }) => {
  const data = await getData(params.category);
  return (
    <div className={styles.container}>
      <div className={styles.categoryTitleContainer}>
        <h1 className={styles.categoryTitle}>{params.category}</h1>
      </div>
      <div className={styles.items}>
        {data.map((item) => {
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.content}>
                <h1 className={styles.title}>{item.title}</h1>
                <p className={styles.desc}>{item.desc}</p>
              </div>
              <div className={styles.imageContainer}>
                <img className={styles.img} alt="" src={item.img} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
