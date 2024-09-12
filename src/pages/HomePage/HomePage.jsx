import DocumentTitle from "../../components/DocumentTitle";
import { FaAddressBook } from "react-icons/fa";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>Contacts book </span>

          <span role="img" aria-label="Greeting icon">
            <FaAddressBook className={styles.icon} />
          </span>
        </h1>
      </div>
    </>
  );
}
