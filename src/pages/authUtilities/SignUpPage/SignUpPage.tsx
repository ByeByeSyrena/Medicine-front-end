import React from "react";
import css from "./SignUpPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";

type valuesTypes = {
  name: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain both letters and numbers"
    )
    .required("Password is required"),
});

const SignUpPage = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values: valuesTypes) => {
    // const newUser = {
    //   values,
    // };
    console.log("Form data", values);
  };

  return (
    <section className={css.container}>
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
