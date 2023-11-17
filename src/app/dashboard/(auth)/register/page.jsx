"use client";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components";
import { BASE_API_URL } from "@/utils/constants";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "Password is too Short!").required("Required"),
});

const Register = () => {
  const [err, setErr] = useState("");
  const [tumbnail, setTumbnail] = useState("");
  const router = useRouter();

  if (!BASE_API_URL) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        img: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        try {
          const res = await fetch(`${BASE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          res.status === 201 &&
            router.push("/dashboard/login?succes=Account has been created");
        } catch (err) {
          setErr(err);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue }) => {
        return (
          <div className={styles.container} data-testid="register">
            <div className={styles.titleContainer}>
              <h2>Create your account</h2>
            </div>
            <Form className={styles.form}>
              <div class={styles.avatar}>
                <img
                  className={styles.image}
                  alt="User Pic"
                  src={tumbnail ? tumbnail : "/profile.png"}
                  id="profile-image1"
                  height="200"
                />
                <input
                  className={styles.input}
                  id="img"
                  type="file"
                  accept="image"
                  name="img"
                  onChange={(e) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                      setFieldValue("img", reader.result);
                      setTumbnail(reader.result);
                    };
                  }}
                />
              </div>
              {Object.keys(values)
                .slice(0, 3)
                .map((inputName, i) => {
                  return (
                    <Input
                      key={i}
                      name={inputName}
                      touched={touched[inputName]}
                      errors={errors[inputName]}
                    />
                  );
                })}

              <button className={styles.button}>Register</button>
            </Form>
            {err && "Something went wrong"}
            <Link rel="preload" href="/dashboard/login">
              Login with an existing account
            </Link>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
