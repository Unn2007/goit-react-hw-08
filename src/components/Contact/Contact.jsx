import { useDispatch, useSelector } from "react-redux";
import { showConfirmModal, showEditModal } from "../../redux/contacts/slice";
import css from "./Contact.module.css";
import {
  FaPhoneAlt,
  FaUser,
  FaSearch,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import EditModal from "../EditModal/EditModal";
import {
  selectConfirmModal,
  selectEditModal,
} from "../../redux/contacts/selectors";

function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectConfirmModal);
  const editedContact = useSelector(selectEditModal);

  const handleEdit = () => {
    dispatch(showEditModal({ id, name, number }));
  };
  const handleDelete = () => {
    dispatch(showConfirmModal(id));
  };
  return (
    <>
      <div className={css.contact}>
        <div className={css.contactInfo}>
          <div className={css.fieldContainer}>
            <FaUser className={css.icon} />
            <p className={css.name}>{name}</p>
          </div>
          <div className={css.fieldContainer}>
            <FaPhoneAlt className={css.icon} />
            <p>{number}</p>
          </div>
        </div>
        <div className={css.buttonContainer}>
          <button onClick={handleDelete} className={css.button}>
            <FaRegTrashAlt />
          </button>
          <button onClick={handleEdit} className={css.button}>
            <FaRegEdit />
          </button>
        </div>
      </div>
      <div>{id === selectedContact && <ConfirmModal />}</div>
      <div>{id === editedContact && <EditModal />}</div>
    </>
  );
}

export default Contact;
