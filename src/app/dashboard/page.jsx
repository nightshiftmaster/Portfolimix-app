"use client";
import useSWR from "swr";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Input, TextArea } from "@/components";
import { Formik, Form } from "formik";
import { BASE_API_URL } from "@/utils/constants";
import Loader from "@/components/loader/Loader";
import { toast } from "react-hot-toast";

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
  const [tumbnail, setTumbnail] = useState("");
  const [sending, setSending] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  if (!BASE_API_URL) {
    return null;
  }

  const { data, mutate, error, isLoading } = useSWR(
    `${BASE_API_URL}/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  const handleDelete = async (id) => {
    if (!BASE_API_URL) {
      return null;
    }
    try {
      await fetch(`${BASE_API_URL}/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (e) {
      console.log(e);
    } finally {
      toast.error("Post deleted", { duration: 5000 });
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }
  if (session.status === "loading") {
    return <Loader name={"Loading..."} />;
  }
  if (sending) {
    return <Loader name={"Uploading..."} />;
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
            if (!BASE_API_URL) {
              return null;
            }
            try {
              await fetch(`${BASE_API_URL}/api/posts`, {
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
              setTumbnail("");
            } catch (e) {
              console.log(e.message);
            } finally {
              setSending(false);
              toast.success("Post created successfully", { duration: 5000 });
            }
          }}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            setSending(isSubmitting);
            return (
              <Form ref={formRef} className={styles.newpost}>
                <h1 className={styles.title}>Add New Post</h1>
                {Object.keys(values)
                  .slice(0, 2)
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
                <TextArea
                  name="content"
                  touched={touched.content}
                  errors={errors.content}
                />
                <div className={styles.uploadContainer}>
                  <h3 className={styles.uploadHeader}>Upload Image</h3>
                  <div className={styles.uploadImage}>
                    <input
                      className={styles.input}
                      id="img"
                      type="file"
                      accept="image"
                      name="img"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = () => {
                          setFieldValue("img", reader.result);
                          setTumbnail(reader.result);
                        };
                      }}
                    />
                    {!tumbnail ? (
                      ""
                    ) : (
                      <img width={100} height={100} src={tumbnail} />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.button}
                >
                  Send
                </button>
              </Form>
            );
          }}
        </Formik>

        <div className={styles.posts}>
          <h1 className={styles.title}>My Posts</h1>
          {data?.map((post) => {
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
                  <span
                    onClick={() => handleDelete(post._id)}
                    className={styles.delete}
                  >
                    X
                  </span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
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
