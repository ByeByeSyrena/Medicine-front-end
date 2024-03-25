import React from "react";
import css from "./SignUpForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import classNames from "classnames";
import FormControl from "../../components/FormControl/FormControl";

type valuesTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  initialValues: valuesTypes;
  onSubmit: (values: valuesTypes) => void;
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

const SignUpForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <>
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
                label="Name"
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
    </>
  );
};

export default SignUpForm;
