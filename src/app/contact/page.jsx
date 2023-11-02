import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/button/Button";

export const metadata = {
  title: "Contact Information",
  description: "This is contact page",
};

const Contacts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Let's Keep in Touch</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            fill={true}
            src="/contact2.jpg"
            alt="contact image"
          />
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea
            className={styles.textArea}
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="message"
          ></textarea>
          <Button text="Send Message" url="" />
        </form>
      </div>
    </div>
  );
};

export default Contacts;
