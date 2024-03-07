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
    comments: "",
  };

  const onSubmit = (values: valuesTypes) => {
    // const newUser = {
    //   values,
    // };
  };

  return (
    <section className={css.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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
          {/* <div>
            <p>Select your position:</p>
            <input type="radio" name="seller" />
            <label htmlFor="seller">Entrepreneur</label>
            <input type="radio" name="user" />
            <label htmlFor="user">Customer</label>
          </div> */}
          <button type="submit" className={css.submitButton}>
            Submit
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default SignUpPage;
