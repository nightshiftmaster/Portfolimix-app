"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
    return <div>...Loading</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      signIn("credentials", { email, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.subtitle}>
          {succes ? "Welcome back" : "Please sign in to see the dashboard"}
        </h1>
        <div className={styles.error}> {error && error} </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <button className={styles.button}>Login</button>
      </form>

      <button className={styles.button} onClick={() => signIn("google")}>
        <img src="/google.png" alt="" className={styles.img} />
        Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
