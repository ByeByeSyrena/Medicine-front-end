import React, { useRef } from "react";
import css from "./SettingsPage.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControl from "../../../components/FormControl/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/users/selectors";
import Image4 from "../../../images/main-page/herbs-in-bottles.jpg";
import Image3 from "../../../images/main-page/books.jpg";
import Image5 from "../../../images/main-page/nurse.jpg";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { updateUser } from "../../../redux/auth/users/operations";

export type initialUpdateUserTypes = {
  name: string;
  password: string;
};

const initialValues: initialUpdateUserTypes = {
  name: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  password: Yup.string().matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must contain 8 characters. At least one digit, one lowercase letter, one uppercase letter"
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Passwords must match"
  ),
});

const SettingsPage = () => {
  const { id } = useParams();

  const formikRef = useRef<any>(null);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (values: initialUpdateUserTypes) => {
    const userId = id || "";
    const updatedUserData: initialUpdateUserTypes = {
      name: values.name,
      password: values.password,
    };

    console.log(updatedUserData);

    dispatch(updateUser({ userId, userData: updatedUserData }));
    formikRef.current.resetForm();
  };

  return (
    <section className={css.container}>
      <div className={css.contentWrapper}>
        <h1>User Settings</h1>
        <div className={css.userInfoWrapper}>
          <p>
            <span>ID:</span> {user._id}
          </p>
          <p>
            <span>Name:</span> {user.name}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Role codes:</span> {user.roles}
          </p>
        </div>
        <button className={css.deleteUserButton}>Delete User</button>
      </div>

      <div className={css.formWrapper}>
        <h2>Update information</h2>
        <p className={css.note}>
          you can update only your name or password, or both
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
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
              label="New password"
              name="password"
              type="password"
              labelClassName="dark-label"
              inputClassName="dark-input"
              wrapperClassName="form-control"
            />
            <FormControl
              control="input"
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              labelClassName="dark-label"
              inputClassName="dark-input"
              wrapperClassName="form-control"
            />
            <button type="submit" className={css.submitFormButton}>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <img src={Image4} alt="img" className={css.imgBack} />
      <img src={Image3} alt="img" className={css.imgBack2} />
      <img src={Image5} alt="img" className={css.imgBack3} />
    </section>
  );
};

export default SettingsPage;
