import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  // console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.articleHeader}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.desc}>{data.body}</div>
          <div className={styles.author}>
            <img
              src={"/author2.jpeg"}
              alt="avatar"
              className={styles.authAvatar}
            />
            <h2 className={styles.authName}>Vlad Medvedev</h2>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image className={styles.img} fill={true} alt="" src="/home3.png" />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.article}>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
          <br />
          <br />
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem.
          <br />
          <br />
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?"
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
