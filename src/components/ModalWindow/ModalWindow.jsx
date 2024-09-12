import Modal from "react-modal";
import { FaRegWindowClose } from "react-icons/fa";
import css from "./ModalWindow.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(64, 64, 64, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalWindow({ children, selector, closeModal }) {
  Modal.setAppElement("#root");

  const modalIsOpen = !!selector;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className={css.modalContent}>
          <button onClick={closeModal} className={css.closeButton}>
            <FaRegWindowClose className={css.icon} />
          </button>
          <div>{children}</div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalWindow;
