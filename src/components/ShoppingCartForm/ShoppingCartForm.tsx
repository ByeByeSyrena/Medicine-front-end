import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./Form.module.css";
import { Medicine } from "../../@types/types";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/orders/operations";
import { AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/stores/storesSlice";
import { toast } from "react-toastify";
import FormControl from "../FormControl/FormControl";

interface OrderFormProps {
  totalPrice: number;
  cartItems: Medicine[];
}

type Values = {
  name: string;
  email: string;
  address: string;
  comments?: string | "";
  pnNumbers: string[];
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  pnNumbers: Yup.array()
    .of(Yup.string().required("At least one phone number is required"))
    .min(1, "At least one phone number is required"),
});

const OrderForm: React.FC<OrderFormProps> = ({ totalPrice, cartItems }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: Values = {
    name: "",
    email: "",
    address: "",
    comments: "",
    pnNumbers: [""],
  };

  const onSubmit = (values: Values, { resetForm }: FormikHelpers<Values>) => {
    let newComments = values.comments as string;

    if (newComments.trim() === "") {
      newComments = "none";
    }

    const newOrder = {
      ...values,
      comments: newComments,
      totalPrice: totalPrice,
      medicines: cartItems,
    };

    if (newOrder.medicines.length === 0) {
      toast.info("Please add medicines to the cart to create an order");
      return;
    }

    console.log(newOrder);

    dispatch(createOrder(newOrder));
    dispatch(clearCart());

    resetForm();
  };

  return (
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
          label="Email"
          name="email"
          type="email"
          labelClassName="dark-label"
          inputClassName="dark-input"
          wrapperClassName="form-control"
        />
        <FormControl
          control="input"
          label="Address"
          name="address"
          type="text"
          labelClassName="dark-label"
          inputClassName="dark-input"
          wrapperClassName="form-control"
        />
        <FormControl
          control="fieldArray"
          label="Add your contact numbers"
          name="pnNumbers"
          type="text"
          labelClassName="dark-label"
          wrapperClassName="form-control"
        />
        <FormControl
          control="textarea"
          label="Comments"
          name="comments"
          type="text"
          labelClassName="dark-label"
          inputClassName="scrollWrapperInput"
          wrapperClassName="form-control"
        />
        <div className={css.elementWrapper}>
          <div className={css.totalPriceWrapper}>
            <div className={css.totalPrice}>
              <span>Total Price: ${totalPrice}</span>
            </div>
          </div>
          <button type="submit" className={css.submitButton}>
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default OrderForm;
