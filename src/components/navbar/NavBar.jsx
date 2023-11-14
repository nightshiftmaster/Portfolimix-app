"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToggle from "../darkMode/DarkMode";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BASE_API_URL } from "@/utils/constants";
import Image from "next/image";
import useSWR from "swr";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Portfolio", url: "/portfolio" },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Contact", url: "/contact" },
  { id: 5, title: "Blog", url: "/blog" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const session = useSession();
  const [userData, setUserData] = useState(null);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  if (!BASE_API_URL) {
    return null;
  }

  const { data, mutate, error, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        My website
      </Link>

      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link, i) => (
          <div className={styles.link} key={link.id}>
            <Link
              href={link.url}
              className={`${active === link.id ? styles.active : ""}`}
              onClick={() => setActive(link.id)}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.user}>
        <Link
          href="/dashboard"
          className={styles.userContainer}
          style={{
            display: session.status === "authenticated" ? "flex" : "none",
          }}
        >
          <div className={styles.imgContainer}>
            {/* <Image
              fill={true}
              src={
                data && session.status === "authenticated" ? data[0].img : null
              }
              alt="avatar"
              className={styles.avatar}
            /> */}
            <img
              className={styles.avatar}
              src={
                data && session.status === "authenticated" ? data[0].img : null
              }
              alt="avatar"
            />
          </div>

          {data && session.status === "authenticated" ? data[0].name : null}
        </Link>
        <button
          className={styles.logout}
          style={{
            display: session.status === "authenticated" ? "block" : "none",
          }}
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
