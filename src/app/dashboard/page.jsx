"use client";
import useSWR from "swr";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import * as Yup from "yup";
import Input from "../../components/input/Input";
import { Formik, Form } from "formik";

const NewPostSchema = Yup.object({
  title: Yup.string().required(),
  desc: Yup.string().required(),
  img: Yup.string().required(),
  content: Yup.string().required(),
});

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const formRef = useRef(null);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

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

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }
  if (session.status === "loading") {
    return <div>loading...</div>;
  }
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            img: "",
            content: "",
          }}
          validationSchema={NewPostSchema}
          onSubmit={async ({ title, desc, img, content }) => {
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
              formRef.current.reset();
            } catch (e) {
              console.log(e.message);
            }
          }}
        >
          {({ values, errors, touched }) => {
            return (
              <Form ref={formRef} className={styles.newpost}>
                <h1 className={styles.title}>Add New Post</h1>
                {Object.keys(values)
                  .slice(0, 3)
                  .map((input, i) => {
                    return (
                      <Input
                        key={i}
                        name={input}
                        touched={touched[input]}
                        errors={errors[input]}
                      />
                    );
                  })}
                {/* <TextArea
                  name="content"
                  touched={touched.content}
                  errors={errors.content}
                /> */}
                <button className={styles.button}>Send</button>
              </Form>
            );
          }}
        </Formik>
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
      </div>
    );
  }
  // router.push("/dashboard");
};

export default Dashboard;
