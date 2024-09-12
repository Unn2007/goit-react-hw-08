import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = {
  password: "",
  email: "",
  name: "",
};
export const RegisterForm = () => {
  const dispatch = useDispatch();
  const passwordFieldId = useId();
  const emailFieldId = useId();
  const nameFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form} autoComplete="off">
        <h2 className={css.formHeader}>Registration</h2>
        <div className={css.fieldContainer}>
          <label className={css.label} htmlFor={nameFieldId}>
            {" "}
            Username{" "}
          </label>
          <Field
            type="name"
            name="name"
            className={css.field}
            id={nameFieldId}
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.fieldContainer}>
          <label className={css.label} htmlFor={emailFieldId}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            className={css.field}
            id={emailFieldId}
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
            className={css.field}
            id={passwordFieldId}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.buttonContainer}>
          <button type="submit" className={css.button}>
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
};
