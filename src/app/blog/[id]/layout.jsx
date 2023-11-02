import React from "react";
import styles from "./page.module.css";

const BlogLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default BlogLayout;
