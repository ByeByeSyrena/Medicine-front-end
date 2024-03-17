import React, { useRef } from "react";
import css from "./LoginPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";
import { loginUser } from "../../../redux/auth/users/operations";
import {
  NavLink,
  // useLocation, useNavigate // if restricted, you go to login and it helps to return to that page you wanted to go, but was unuathorized
} from "react-router-dom";

export type valuesTypes = {
  email: string;
  password: string;
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

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: valuesTypes) => {
    console.log("Form data", values);
    dispatch(loginUser(values));
    formikRef.current.resetForm();
    // navigate(from, { replace: true });
  };

  return (
    <section className={css.container}>
      <h1>Login</h1>
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
        Don't have an account? Log in{" "}
        <NavLink to="/signup" className={css.navlinkToForm}>
          here
        </NavLink>
      </p>
    </section>
  );
};

export default LoginPage;
