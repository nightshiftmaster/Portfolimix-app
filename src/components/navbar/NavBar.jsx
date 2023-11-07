"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkMode/DarkMode";
import { signOut } from "next-auth/react";
import { useState } from "react";

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
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        My website
      </Link>

      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => {
          return (
            <div className={styles.link}>
              <Link
                key={link.id}
                href={link.url}
                className={`${active === link.id ? styles.active : ""}`}
                onClick={() => setActive(link.id)}
              >
                {link.title}
              </Link>
            </div>
          );
        })}
        <button className={styles.logout} onClick={signOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
