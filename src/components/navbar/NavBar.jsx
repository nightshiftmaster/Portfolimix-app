"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkMode/DarkMode";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Portfolio", url: "/portfolio" },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Contact", url: "/contact" },
  { id: 5, title: "Blog", url: "/blog" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        My website
      </Link>

      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => {
          return (
            <Link href={link.url} className={styles.link} key={link.id}>
              {link.title}
            </Link>
          );
        })}
        <button className={styles.logout} onClick={() => {}}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
