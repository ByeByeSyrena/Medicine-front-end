import React, { useRef, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import css from "./SellerAuthWindow.module.css";
import LoginForm from "../LoginForm/LoginForm";
import { LoginUser, RegUser } from "../../@types/types";
import { ReactComponent as Cross } from "../../images/cross.svg";
import SignUpForm from "../SignUpForm/SignUpForm";
import { ReactComponent as Arrow } from "../../images/arrow.svg";
import {
  createPharmacy,
  loginPharmacy,
} from "../../redux/auth/pharmacies/operations";

type Props = {
  onClose: () => void;
};

const SellerAuthWindow: React.FC<Props> = ({ onClose }) => {
  const formikRef = useRef<any>(null);

  const [isTrue, setForm] = useState<boolean>(false);
  const [arrowDirection, setArrowDirection] = useState<number>(0);

  const toggleForms = () => {
    setForm((prev) => !prev);
    setArrowDirection((prev) => (prev === 0 ? 1 : 0));
  };

  const dispatch = useDispatch<AppDispatch>();

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const initialRegisterValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onLoginSubmit = (values: LoginUser) => {
    dispatch(loginPharmacy(values));
  };

  const onRegisterSubmit = (values: RegUser) => {
    const newPharmacy = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(createPharmacy(newPharmacy));

    toggleForms();
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
        <div className={css.upperStylingDiv}>
          <motion.button
            type="button"
            className={css.closeButton}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClose()}
          >
            <Cross className={css.cross} />
          </motion.button>
        </div>
        <div className={css.circleArea}>
          <motion.div
            animate={{ x: arrowDirection === 0 ? [-90, 0] : [0, -90] }}
            className={css.circleArea2}
          >
            <motion.div
              animate={{
                x: 0,
                y: [0, 2],
                transition: {
                  duration: 0.5,
                  delay: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            >
              <Arrow className={css.arrow} />
            </motion.div>
          </motion.div>
        </div>
        <ul>
          <li>
            <motion.button
              className={css.authButton}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleForms}
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
              onClick={toggleForms}
            >
              Login
            </motion.button>
          </li>
        </ul>

        <div className={css.formWrapper}>
          {!isTrue && (
            <LoginForm
              onSubmit={onLoginSubmit}
              formikRef={formikRef}
              initialValues={initialLoginValues}
            />
          )}
          {isTrue && (
            <SignUpForm
              onSubmit={onRegisterSubmit}
              initialValues={initialRegisterValues}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SellerAuthWindow;
