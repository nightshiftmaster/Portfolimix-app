import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";

const Blog = async () => {
  const getData = async () => {
    if (!BASE_API_URL) {
      return null;
    }
    const res = await fetch(`${BASE_API_URL}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  };

  // const data = await getData();
  const data = [{}, {}, {}];

  return (
    <div className={styles.container}>
      <div className={styles.mainTitleContainer}>
        <h1 className={styles.mainTitle}>Blogs</h1>
      </div>

      <div className={styles.posts}>
        {data?.map((post) => {
          return (
            <Link
              href={`blog/${post._id}`}
              className={styles.item}
              key={post.id}
            >
              <div className={styles.imageContainer}>
                <Image
                  className={styles.img}
                  fill={true}
                  alt="post image"
                  src={post.img}
                />
              </div>
              <div className={styles.content}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
