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

  console.log(error);

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
  };

  return (
    <section className={css.container}>
      <h1>Registration</h1>
      <Formik
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
                label="Name / Pharmacy account's name"
                name="name"
                type="text"
                labelClassName="dark-label"
                inputClassName="dark-input"
                wrapperClassName="form-control"
              />
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
              <FormControl
                control="input"
                label="Confirm password"
                name="confirmPassword"
                type="password"
                labelClassName="dark-label"
                inputClassName="dark-input"
                wrapperClassName="form-control"
              />
              <button
                type="submit"
                className={classNames(css["dark-button"])}
                disabled={!formik.isValid}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default SignUpPage;
