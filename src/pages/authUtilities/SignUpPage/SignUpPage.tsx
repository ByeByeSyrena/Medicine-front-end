import React, { useEffect } from "react";
import css from "./SignUpPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";
import { createUser } from "../../../redux/auth/users/operations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { selectUserError } from "../../../redux/auth/users/selectors";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import HandGif from "../../../images/hand.gif";

import { motion } from "framer-motion";
import SignUpForm from "../../../components/SignUpForm/SignUpForm";

type valuesTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain 8 characters. At least one digit, one lowercase letter, one uppercase letter"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirmation is required"),
});

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector(selectUserError);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const variants = {
    initial: {
      x: -500,
      y: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  };

  useEffect(() => {
    if (error?.errorCode === 400) {
      console.log("Bad request");
      return;
    } else if (error?.errorCode === 401) {
      console.log("Unauthorized");
      return;
    } else if (error?.errorCode === 500) {
      console.log("Internal Server error");
      return;
    }
  }, [error]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: valuesTypes) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(createUser(newUser));

    console.log("Form data", newUser);
    navigate(from, { replace: true });
  };

  return (
    <motion.section
      className={css.container}
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <motion.div className={css.contentWrapper} variants={variants}>
        <motion.img src={HandGif} alt="Hand" variants={variants} />
      </motion.div>
      <motion.div className={css.regFormWrapper} variants={variants}>
        <h1>Registration</h1>
        <SignUpForm onSubmit={onSubmit} initialValues={initialValues} />
        <p>
          Have an account? Log in{" "}
          <NavLink to="/login" className={css.navlinkToForm}>
            here
          </NavLink>
        </p>
      </motion.div>
    </motion.section>
  );
};

export default SignUpPage;
