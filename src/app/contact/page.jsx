"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { BASE_API_URL, PATH } from "@/utils/constants";

// export const metadata = {
//   title: "Contact Information",
//   description: "This is contact page",
// };

const Contacts = () => {
  const [sucess, setSucess] = useState("");
  const [errors, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setDisable(true);
      if (!formData.name) {
        throw new Error("Please fill the form !");
      }
      const response = await fetch(`${BASE_API_URL}/${PATH}/email`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        setError("");
        setSucess("Email sent successfully!");
        formRef.current.reset();
        setDisable(false);
      } else {
        setError("Email sending failed. Please try again later.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container} data-testid="contact">
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Let's Keep in Touch</h1>
      </div>
      <h3 className={styles.sucessFeedback}>{sucess ? sucess : null}</h3>
      <h3 className={styles.errorFeedback}>{errors ? errors : null}</h3>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            fill={true}
            src="/contact2.jpg"
            alt="contact image"
          />
        </div>
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <input
            type="text"
            placeholder="name"
            className={styles.input}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            className={styles.input}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <textarea
            className={styles.textArea}
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="message"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button disabled={disable} type="submit" className={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
