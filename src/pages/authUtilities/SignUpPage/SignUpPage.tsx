import React from "react";
import css from "./SignUpPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";
import data from "../../../data/authOptions.json";

const authRoles = data;

type valuesTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirmation is required"),
  role: Yup.string().required("Choose your status"),
});

const SignUpPage = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seller",
  };

  const onSubmit = (values: valuesTypes) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    if (values.role && values.role === "seller") {
    }

    if (values.role && values.role === "customer") {
    }

    console.log("Form data", values);
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
              <FormControl
                control="radio"
                label="Choose your role"
                name="role"
                radioOptions={authRoles}
                type="radio"
                labelClassName="radioLabel"
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
