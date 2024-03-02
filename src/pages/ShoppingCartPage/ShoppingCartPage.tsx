import React from "react";
import css from "./ShoppingCartPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
import classNames from "classnames";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const ShoppingCartPage = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className={css.container}>
      <div>
        <h1>Fullfill order details</h1>
        <form onSubmit={formik.handleSubmit} className={css["dark-form"]}>
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
              <div>{formik.errors.name}</div>
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
              <div>{formik.errors.email}</div>
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
              <div>{formik.errors.phone}</div>
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
              <div>{formik.errors.address}</div>
            )}
          </div>
        </form>
      </div>
      <div className={css.shopPage}>{/* Items from the shop page */}</div>
      <div>
        <div>
          <span>Total Price</span>
        </div>
        <button
          type="submit"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default ShoppingCartPage;
