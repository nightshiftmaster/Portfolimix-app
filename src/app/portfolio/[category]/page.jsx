import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items } from "./data";
import { notFound } from "next/navigation";
import { GET } from "@/app/api/posts/route";

const getData = (category) => {
  const data = items[category];
  return data ?? notFound();
};

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>{params.category}</h1>

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
                src={item.image}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
