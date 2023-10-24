"use client";
import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className={styles.container}>
      <input type="text" />
      <button onClick={() => signIn("google")}>Login with Google</button>
    </div>
  );
};

export default Login;
