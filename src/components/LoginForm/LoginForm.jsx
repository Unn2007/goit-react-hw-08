import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const FeedbackSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
});
const initialValues = {
  password: "",
  email: "",
};

export const LoginForm = () => {
  const passwordFieldId = useId();
  const emailFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    

    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form} autoComplete="off">
        <h2 className={css.formHeader}>Log In</h2>
        <div className={css.fieldContainer}>
          <label className={css.label} htmlFor={emailFieldId}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={emailFieldId}
            className={css.field}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </div>
        <div className={css.fieldContainer}>
          <label className={css.label} htmlFor={passwordFieldId}>
            Password
          </label>
          <Field
            type="password"
            name="password"
            id={passwordFieldId}
            className={css.field}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.buttonContainer}>
          <button type="submit" className={css.button}>
            Log In
          </button>
        </div>
      </Form>
    </Formik>
  );
};
