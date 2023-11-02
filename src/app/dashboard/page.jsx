"use client";
import useSWR from "swr";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import * as yup from "yup";
import { IoMdAlert } from "react-icons/io";

let userSchema = yup.object({
  title: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required(),
  content: yup.string().required(),
});

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const formRef = useRef(null);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    img: "",
    content: "",
  });

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await userSchema.validate(
        { title, desc, img, content },
        { abortEarly: false }
      );
      formRef.current.reset();
    } catch (e) {
      const newErr = {};
      e.inner.forEach((err) => (newErr[err.path] = err.message + "!"));
      setErrors(newErr);
    }

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session?.data.user.name,
        }),
      });
      mutate();
    } catch (e) {
      console.log(e.message);
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }
  if (session.status === "loading") {
    return <div>loading...</div>;
  }
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          <h1 className={styles.title}>My Posts</h1>
          {isLoading
            ? "...loading"
            : data?.map((post) => {
                return (
                  <div className={styles.post} key={post._id}>
                    <div className={styles.imgContainer}>
                      <Image
                        className={styles.img}
                        width={200}
                        height={100}
                        alt="post image"
                        src={post.img}
                      />
                    </div>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <span
                      onClick={() => handleDelete(post._id)}
                      className={styles.delete}
                    >
                      X
                    </span>
                  </div>
                );
              })}
        </div>
        <form ref={formRef} className={styles.newpost} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Add New Post</h1>
          <>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Title"
                style={{ outline: errors?.title ? "2px solid red" : "none" }}
                className={styles.input}
                onFocus={() =>
                  setErrors((curr) => {
                    curr.title = "";
                    return { ...curr };
                  })
                }
              />
              <IoMdAlert
                className={styles.alerticon}
                display={errors?.title ? "block" : "none"}
              />
            </div>
            <div className={styles.invalidfeedback}>{errors?.title}</div>
          </>
          <>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Desc"
                className={styles.input}
                style={{ outline: errors?.desc ? "2px solid red" : "none" }}
                onFocus={() =>
                  setErrors((curr) => {
                    curr.desc = "";
                    return { ...curr };
                  })
                }
              />
              <IoMdAlert
                className={styles.alerticon}
                display={errors?.desc ? "block" : "none"}
              />
            </div>
            <div className={styles.invalidfeedback}>{errors?.desc}</div>
          </>
          <>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Image"
                className={styles.input}
                style={{ outline: errors?.img ? "2px solid red" : "none" }}
                onFocus={() =>
                  setErrors((curr) => {
                    curr.img = "";
                    return { ...curr };
                  })
                }
              />
              <IoMdAlert
                className={styles.alerticon}
                display={errors?.img ? "block" : "none"}
              />
            </div>
            <div className={styles.invalidfeedback}>{errors?.img}</div>
          </>
          <>
            <textarea
              className={styles.textarea}
              placeholder="Content"
              style={{ outline: errors?.content ? "2px solid red" : "none" }}
              onFocus={() =>
                setErrors((curr) => {
                  curr.content = "";
                  return { ...curr };
                })
              }
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <div className={styles.invalidfeedback}>{errors?.content}</div>
          </>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
  // router.push("/dashboard");
};

export default Dashboard;
