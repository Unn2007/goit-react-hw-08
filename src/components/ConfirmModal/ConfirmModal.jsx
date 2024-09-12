import ModalWindow from "../ModalWindow/ModalWindow";
import { useSelector, useDispatch } from "react-redux";
import { selectConfirmModal } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import { hideConfirmModal } from "../../redux/contacts/slice";
import { toast } from "react-hot-toast";
import css from "./ConfirmModal.module.css";

function ConfirmModal() {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(hideConfirmModal());
  };
  const selectedContact = useSelector(selectConfirmModal);
  const handleDelete = () => {
    dispatch(deleteContact(selectedContact)).then((result) => {
      if (deleteContact.fulfilled.match(result)) {
        toast.success("Contact deleted successfully", {
          duration: 2000,
          position: "top-center",
        });
      }
    });
  };

  return (
    <ModalWindow selector={selectedContact} closeModal={hideModal}>
      <div className={css.container}>
        <h2 className={css.description}>A You sure?</h2>
        <div className={css.buttonContainer}>
          <button onClick={handleDelete} className={css.button}>
            Yes
          </button>
          <button onClick={() => hideModal()} className={css.button}>
            No
          </button>
        </div>
      </div>
    </ModalWindow>
  );
}

export default ConfirmModal;
