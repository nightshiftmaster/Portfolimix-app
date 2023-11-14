"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { Input } from "@/components";
import Loader from "@/components/loader/Loader";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSucces(params.get("succes"));
  }, [params]);

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }
  if (session.status === "loading") {
    return <Loader name={"Login"} />;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async ({ email, password }) => {
        try {
          signIn("credentials", { email, password });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ values, isSubmitting }) => {
        // console.log(isSubmitting);
        return isSubmitting ? (
          <Loader name={"Login"} />
        ) : (
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <h1 className={styles.subtitle}>
                {succes
                  ? "Welcome back"
                  : "Please sign in to see the dashboard"}
              </h1>
              <div className={styles.error}> {error && error} </div>
            </div>
            <Form className={styles.form}>
              {Object.keys(values).map((inputName, i) => {
                return (
                  <Input name={inputName} disabled={isSubmitting} key={i} />
                );
              })}

              <button type="submit" className={styles.button}>
                Login
              </button>
              <button
                type="submit"
                className={styles.button}
                onClick={() => signIn("google")}
                disabled={isSubmitting}
              >
                <img src="/google.png" alt="" className={styles.img} />
                Google
              </button>
            </Form>

            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/dashboard/register">
              Create new account
            </Link>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
