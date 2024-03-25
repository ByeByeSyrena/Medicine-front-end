import React from "react";
import css from "./LoginForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import classNames from "classnames";
import FormControl from "../../components/FormControl/FormControl";

type initialTypes = {
  email: string;
  password: string;
};

type Props = {
  formikRef: any;
  initialValues: initialTypes;
  onSubmit: (values: initialTypes) => void;
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

const LoginForm: React.FC<Props> = ({ formikRef, initialValues, onSubmit }) => {
  return (
    <>
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
    </>
  );
};

export default LoginForm;
