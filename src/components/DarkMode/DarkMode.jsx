import React from "react";
import styles from "./darkmode.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>&#127769;</div>
      <div className={styles.icon}>&#9728;&#65039;</div>
      <div
        className={styles.ball}
        // onClick={toggle}
        style={mode === "dark" ? { left: "2px" } : { right: "2px" }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
