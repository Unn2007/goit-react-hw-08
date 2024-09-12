import DocumentTitle from "../../components/DocumentTitle";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
export default function RegisterPage() {
  return (
    <div className={css.container}>
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </div>
  );
}
