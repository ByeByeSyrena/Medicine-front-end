import React from "react";
import css from "./SignUpPage.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import TextError from "../../../components/TextError/TextError";

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
              <div className={css["form-control"]}>
                <label htmlFor="name" className={css["dark-label"]}>
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={classNames(css["dark-input"])}
                />
                <ErrorMessage
                  name="name"
                  component={TextError as React.ComponentType<{}>}
                />
              </div>
              <div className={css["form-control"]}>
                <label htmlFor="email" className={css["dark-label"]}>
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={classNames(css["dark-input"])}
                />
                <ErrorMessage
                  name="email"
                  component={TextError as React.ComponentType<{}>}
                />
              </div>
              <div className={css["form-control"]}>
                <label htmlFor="password" className={css["dark-label"]}>
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="text"
                  className={classNames(css["dark-input"])}
                />
                <ErrorMessage
                  name="password"
                  component={TextError as React.ComponentType<{}>}
                />
              </div>
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
