import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact } from "../../redux/contacts/operations";
import {
  selectEditModal,
  selectEditedContactData,
} from "../../redux/contacts/selectors";
import toast from "react-hot-toast";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  telNumber: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function ContactForm({ isEditContact }) {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectEditModal);
  const selectedContactData = useSelector(selectEditedContactData);
  const initialValues = selectedContact
    ? {
        username: selectedContactData.name,
        telNumber: selectedContactData.number,
      }
    : { username: "", telNumber: "" };

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({ name: values.username, number: values.telNumber })
    ).then((result) => {
      if (addContact.fulfilled.match(result)) {
        toast.success("Contact successfully added", {
          duration: 2000,
          position: "top-center",
        });
      }
    });

    actions.resetForm();
  };

  const handleEdit = (values, actions) => {
    dispatch(
      editContact({
        contactId: selectedContact,
        contact: { name: values.username, number: values.telNumber },
      })
    ).then((result) => {
      if (editContact.fulfilled.match(result)) {
        toast.success("Contact changed successfully", {
          duration: 2000,
          position: "top-center",
        });
      }
    });
  };

  const usernameFieldId = useId();
  const telNumberFieldId = useId();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={isEditContact ? handleEdit : handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        {isEditContact ? (
          <h2 className={css.formHeader}>Edit contact</h2>
        ) : (
          <h2 className={css.formHeader}>Add contact</h2>
        )}
        <div className={css.fieldContainer}>
          <label htmlFor={usernameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="username"
            id={usernameFieldId}
            className={css.field}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.fieldContainer}>
          <label htmlFor={telNumberFieldId} className={css.label}>
            Number
          </label>
          <Field
            type="tel"
            name="telNumber"
            id={telNumberFieldId}
            className={css.field}
          />
          <ErrorMessage
            name="telNumber"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.buttonContainer}>
          {!isEditContact && (
            <button type="submit" className={css.button}>
              Add contact
            </button>
          )}
          {isEditContact && (
            <button type="submit" className={css.button}>
              Confirm changes
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
}

export default ContactForm;
