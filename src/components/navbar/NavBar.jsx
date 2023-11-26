"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToggle from "../darkMode/DarkMode";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  if (!BASE_API_URL) {
    return null;
  }

  const { data } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  return (
    <div className={styles.container} data-testid="navbar">
      <Link href="/" className={styles.logo}>
        PorfoliMix
      </Link>

      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link, i) => (
          <Link
            key={link.id}
            href={link.url}
            className={`${active === link.id ? styles.active : styles.regular}`}
            onClick={() => setActive(link.id)}
          >
            <div className={styles.link}>{link.title}</div>
          </Link>
        ))}
      </div>
      <div className={styles.user}>
        <Link
          href="/dashboard"
          data-testid="user"
          className={styles.userContainer}
          style={{
            display: session.status === "authenticated" ? "flex" : "none",
          }}
        >
          <div className={styles.imgContainer}>
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
          onClick={() => {
            signOut({ callbackUrl: "/dashboard/login" });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
