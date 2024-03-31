import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { motion } from "framer-motion";
import css from "./Popup.module.css";
import { deleteUser } from "../../redux/auth/users/operations";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const Popup: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const handleDeleteUser = () => {
    if (id) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <motion.div
      className={css.backdrop}
      initial={{ y: "-100vh", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.1,
          type: "spring",
          damping: 25,
          stiffness: 500,
        },
      }}
      exit={{
        y: "-100vh",
        opacity: 0,
        transition: {
          duration: 0.1,
          type: "spring",
          damping: 25,
          stiffness: 500,
        },
      }}
    >
      <div className={css.modal}>
        <h1 className={css.question}>
          Are you sure that you want to delete your profile?
        </h1>
        <div className={css.buttonWrapper}>
          <button type="button" onClick={handleDeleteUser}>
            Yes
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;
