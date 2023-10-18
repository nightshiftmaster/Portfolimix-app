import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  return await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

const Blog = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      {data.map((post) => {
        return (
          <Link href={`blog/${post.id}`} className={styles.item} key={post.id}>
            <div className={styles.imageContainer}>
              <Image
                className={styles.img}
                fill={true}
                alt="post image"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.desc}>{post.body}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;
