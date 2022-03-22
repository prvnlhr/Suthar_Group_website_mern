import React from "react";
import styles from "../../css/modal/deleteModal.module.css";
import WarningIcon from "./WarningIcon";
const DeleteModal = ({ showModal, setShowModal, confirmDelete }) => {
  return (
    <div className={styles.deleteModalWrapper}>
      <div className={styles.warningIconWrapper}>
        <WarningIcon />
      </div>
      <div className={styles.deleteTittleWrapper}>
        <p className={styles.deleteTitle}>Delete item permanently ?</p>
      </div>
      <div className={styles.deleteMessageWrapper}>
        <p className={styles.deleteMessage}>
          This action is irreversible . Deletion of this item will remove it
          from database
        </p>
      </div>
      <div className={styles.cancelBtnWrapper}>
        <button
          className={styles.cancelBtn}
          onClick={() => {
            setShowModal(false);
          }}
        >
          <p className={styles.cancelText}>Cancel</p>
        </button>
      </div>
      <div className={styles.deleteBtnWrapper}>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            confirmDelete();
          }}
        >
          <p className={styles.deleteText}>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;

// import React from "react";
// import modalStyles from "../../css/modal/modal.module.css";
// import { useSelector } from "react-redux";
// const DeleteModal = ({ modalShow, setModalShow, confirmDelete }) => {
//   return (
//     <div className={modalStyles.modalContainer}>
//       <div className={modalStyles.dialogDiv}>
//         <p>Are you sure you want to delete this item permanently ?</p>
//       </div>
//       <div className={modalStyles.modalBtnDiv}>
//         <div
//           className={modalStyles.modalCancelBtn}
//           onClick={() => {
//             setModalShow(!modalShow);
//           }}
//         >
//           <p>Cancel</p>
//         </div>
//         <div
//           className={modalStyles.modalConfirmBtn}
//           onClick={() => {
//             confirmDelete();
//           }}
//         >
//           <p>Sure, Delete ! </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;
