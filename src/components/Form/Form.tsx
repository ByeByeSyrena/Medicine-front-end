import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import css from "./Form.module.css";
import { Medicine } from "../../@types/types";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/orders/operations";
import { AppDispatch } from "../../redux/store";

interface FormProps {
  totalPrice: number;
  cartItems: Medicine[];
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const Form: React.FC<FormProps> = ({ totalPrice, cartItems }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newOrder = {
        ...values,
        totalPrice: totalPrice,
        medicines: cartItems,
      };
      dispatch(createOrder(newOrder));
      console.log(newOrder);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <div>
        <label htmlFor="name" className={css["dark-label"]}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className={classNames(css["dark-input"], {
            [css["error"]]: formik.touched.name && formik.errors.name,
          })}
        />
        {formik.errors.name && formik.touched.name && (
          <div className={css.errorMessage}>{formik.errors.name}</div>
        )}
      </div>
      <div>
        <label htmlFor="email" className={css["dark-label"]}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={classNames(css["dark-input"], {
            [css["error"]]: formik.touched.email && formik.errors.email,
          })}
        />
        {formik.errors.email && formik.touched.email && (
          <div className={css.errorMessage}>{formik.errors.email}</div>
        )}
      </div>
      <div>
        <label htmlFor="phone" className={css["dark-label"]}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className={classNames(css["dark-input"], {
            [css["error"]]: formik.touched.phone && formik.errors.phone,
          })}
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className={css.errorMessage}>{formik.errors.phone}</div>
        )}
      </div>
      <div>
        <label htmlFor="address" className={css["dark-label"]}>
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
          className={classNames(css["dark-input"], {
            [css["error"]]: formik.touched.address && formik.errors.address,
          })}
        />
        {formik.errors.address && formik.touched.address && (
          <div className={css.errorMessage}>{formik.errors.address}</div>
        )}
      </div>
      <button
        type="submit"
        className={css.submitButton}
        onSubmit={() => {
          formik.handleSubmit();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
