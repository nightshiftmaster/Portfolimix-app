"use client";
import useSWR from "swr";
import React from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Dashboard = () => {
  const { data: session, status } = useSession();

  console.log(session);
  // const { data, error, isLoading } = useSWR(
  //   "https://jsonplaceholder.typicode.com/posts",
  //   fetcher
  // );
  // if (error) return <div>failed to load</div>;
  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "authenticated") {
    return <div className={styles.container}>Dashboard</div>;
  }
};

export default Dashboard;
