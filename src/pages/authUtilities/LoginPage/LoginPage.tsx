import { useRef } from "react";
import css from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";

import { loginUser } from "../../../redux/auth/users/operations";
import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import family from "../../../images/family.png";
import LoginForm from "../../../components/LoginForm/LoginForm";

export type valuesTypes = {
  email: string;
  password: string;
};

const variants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const LoginPage = () => {
  const formikRef = useRef<any>(null);

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: valuesTypes) => {
    console.log("Form data", values);
    dispatch(loginUser(values));
    formikRef.current.resetForm();
  };

  return (
    <section className={css.container}>
      <motion.div
        className={css.contentWrapper}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className={css.slogan} variants={variants}>
          Your Health, Our Priority:
          <br /> Where Quality Meets Care!
        </motion.h1>
        <motion.img src={family} alt="family" variants={variants} />
      </motion.div>
      <div className={css.loginFormWrapper}>
        <h2>Login</h2>
        <LoginForm
          onSubmit={onSubmit}
          formikRef={formikRef}
          initialValues={initialValues}
        />
        <p>
          Don't have an account? Sign up{" "}
          <NavLink to="/signup" className={css.navlinkToForm}>
            here
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
