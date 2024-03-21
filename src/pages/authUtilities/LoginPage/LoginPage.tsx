import { useRef } from "react";
import css from "./LoginPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";
import { loginUser } from "../../../redux/auth/users/operations";
import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import family from "../../../images/family.png";

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

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain both uppercase and lowercase letters and numbers"
    )
    .required("Password is required"),
});

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
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form className={css.form}>
                <FormControl
                  control="input"
                  label="Email"
                  name="email"
                  type="email"
                  labelClassName="dark-label"
                  inputClassName="dark-input"
                  wrapperClassName="form-control"
                />
                <FormControl
                  control="input"
                  label="Password"
                  name="password"
                  type="password"
                  labelClassName="dark-label"
                  inputClassName="dark-input"
                  wrapperClassName="form-control"
                />

                <button
                  type="submit"
                  className={classNames(css["dark-button"])}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
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
