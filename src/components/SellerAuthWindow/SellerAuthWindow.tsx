import React, { useRef } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import css from "./SellerAuthWindow.module.css";
import LoginForm from "../LoginForm/LoginForm";
import { LoginUser } from "../../@types/types";

type Props = {
  onClose: () => void;
};

const SellerAuthWindow: React.FC<Props> = ({ onClose }) => {
  const formikRef = useRef<any>(null);

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: LoginUser) => {
    // dispatch(loginUser(values));
    formikRef.current.resetForm();
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
        <ul>
          <li>
            <motion.button
              className={css.authButton}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              SignUp
            </motion.button>
          </li>
          <li>
            <div className={css.line}></div>
          </li>
          <li>
            <motion.button
              className={css.authButton}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Login
            </motion.button>
          </li>
        </ul>
        <div>
          <LoginForm
            onSubmit={onSubmit}
            formikRef={formikRef}
            initialValues={initialValues}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SellerAuthWindow;
