import React, { useState } from "react";
import css from "./ShoppingCartPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/stores/selectors";
import { Medicine } from "../../@types/types";
import { deleteFromCart } from "../../redux/stores/storesSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const ShoppingCartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCart);

  console.log(cartItems);

  const handleDeleteFromCartClick = (id: string) => {
    dispatch(deleteFromCart(id));
  };

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
        </form>
      </div>
      <div className={css.shopPage}>
        <ul className={css.cartList}>
          {cartItems &&
            cartItems.map((item: Medicine, index: number) => (
              <li key={item._id} className={css.cartLi}>
                <img
                  src={require("../../images/pill-bottle-311809_1280.png")}
                  alt={item.item}
                  className={css.image}
                  style={{ objectFit: "contain" }}
                />
                <div className={css.itemInnerDiv}>
                  <h3>{item.item}</h3>
                  <p>{item.price} per 1</p>
                  <input
                    type="number"
                    min="0"
                    // onChange={() => {
                    //   handleTotalPrice();
                    // }}
                    placeholder="Set amount"
                    className={classNames(
                      css["dark-input"],
                      css["quantity-input"]
                    )}
                  />
                  <button
                    className={css.removeButton}
                    type="button"
                    onClick={() => handleDeleteFromCartClick(item._id ?? "")}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div>{/* <span>Total Price: {totalPrice}</span> */}</div>
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
