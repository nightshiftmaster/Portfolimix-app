import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const getData = async (id) => {
  if (!BASE_API_URL) {
    return null;
  }
  const res = await fetch(`${BASE_API_URL}/api/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
};

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.articleHeader}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.desc}>{data.desc}</div>
          <div className={styles.author}>
            <img
              src={"/author2.jpeg"}
              alt="avatar"
              className={styles.authAvatar}
            />
            <h2 className={styles.authName}>{data.username}</h2>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image className={styles.img} fill={true} alt="" src={data.img} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.article}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
