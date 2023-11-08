import styles from "./input.module.css";
import { Field, useField } from "formik";
import { IoMdAlert } from "react-icons/io";

const Input = ({ name, touched = null, errors = null }) => {
  return (
    <div className={styles.inputContainer}>
      <Field
        name={name}
        placeholder={name}
        className={styles.input}
        style={{
          outline:
            touched && errors
              ? "2px solid red"
              : touched
              ? "2px solid white"
              : null,
        }}
        required
      />
      <IoMdAlert
        className={styles.alerticon}
        display={touched && errors ? "block" : "none"}
      />
      {touched && errors ? <div className={styles.error}>{errors}</div> : null}
    </div>
  );
};
const TextArea = ({ name, touched, errors }) => {
  const [field, meta] = useField(name);
  return (
    <div className={styles.inputContainer}>
      <textarea
        name={name}
        {...field}
        placeholder={name}
        className={styles.textarea}
        style={{
          outline: touched && errors ? "2px solid red" : "none",
        }}
        id=""
        cols="30"
        rows="10"
        required
      ></textarea>
      <IoMdAlert
        className={styles.alerticon}
        display={touched && errors ? "block" : "none"}
      />
      {touched && errors ? <div className={styles.error}>{errors}</div> : null}
    </div>
  );
};

export { Input, TextArea };
