"use client";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../../../../components/input/Input";

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
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        try {
          const res = await fetch("/api/auth/register", {
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
      {({ values, errors, touched }) => {
        return (
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <h2>Create your account</h2>
            </div>
            <Form className={styles.form}>
              {Object.keys(values).map((inputName, i) => {
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
            <Link href="/dashboard/login">Login with an existing account</Link>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
