import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items } from "./data";
import { notFound } from "next/navigation";
import { GET } from "@/app/api/posts/route";

// const getData = (category) => {
//   const data = items[category];
//   return data ?? notFound();
// };

async function getData(category) {
  const res = await fetch(`http://localhost:3000/api/works/${category}`, {
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
                <Button text="See More" url="#" />
              </div>
              <div className={styles.imageContainer}>
                <img
                  // height={300}
                  // width={300}
                  className={styles.img}
                  alt=""
                  src={item.img}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
