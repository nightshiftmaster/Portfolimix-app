import React from "react";
import styles from "./loader.module.css";

const Loader = ({ name }) => {
  return <span className={styles.loader}>{name}</span>;
};

export default Loader;
