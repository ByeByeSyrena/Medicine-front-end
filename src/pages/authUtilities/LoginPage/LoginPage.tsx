import React, { useEffect } from "react";
import css from "./LoginPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import classNames from "classnames";
import FormControl from "../../../components/FormControl/FormControl";
import { loginUser } from "../../../redux/auth/users/operations";
import { selectUserError } from "../../../redux/auth/users/selectors";

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

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: valuesTypes) => {

    console.log("Form data", values);
    dispatch(loginUser(values));
  };

  return (
    <section className={css.container}>
      <h1>Login</h1>
      <div>
        <button type="button">I am a buyer</button>
        <button type="button">I am a seller</button>
      </div>
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

export default LoginPage;
