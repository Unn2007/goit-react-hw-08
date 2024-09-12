import { useDispatch, useSelector } from "react-redux";
import { selectEditModal } from "../../redux/contacts/selectors";
import { hideEditModal } from "../../redux/contacts/slice";
import ContactForm from "../ContactForm/ContactForm";
import ModalWindow from "../ModalWindow/ModalWindow";

function editModal() {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectEditModal);

  const hideModal = () => {
    dispatch(hideEditModal());
  };

  return (
    <ModalWindow selector={selectedContact} closeModal={hideModal}>
      <ContactForm isEditContact={true} />
    </ModalWindow>
  );
}

export default editModal;
