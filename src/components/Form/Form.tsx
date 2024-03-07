import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import css from "./Form.module.css";
import { Medicine } from "../../@types/types";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/orders/operations";
import { AppDispatch } from "../../redux/store";
import { clearCart } from "../../redux/stores/storesSlice";
import { toast } from "react-toastify";
import TextError from "../TextError/TextError";

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
          <label htmlFor="address" className={css["dark-label"]}>
            Address
          </label>
          <Field name="address">
            {(props: any) => {
              const { field, meta } = props;
              return (
                <div>
                  <input
                    type="text"
                    id="address"
                    className={classNames(css["dark-input"])}
                    {...field}
                  />
                  {meta.touched && meta.error ? (
                    <div className={css["error"]}>{meta.error}</div>
                  ) : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className={css["form-control"]}>
          <label htmlFor="phone" className={css["dark-label"]}>
            Add your contact numbers
          </label>
          <FieldArray name="pnNumbers">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values, errors } = form;
              const { pnNumbers } = values;

              return (
                <div>
                  {pnNumbers.map((pnNumber: string, index: number) => (
                    <div key={index}>
                      <Field
                        name={`pnNumbers[${index}]`}
                        className={classNames(css["dark-input"])}
                      />
                      {errors &&
                        Array.isArray(errors.pnNumbers) &&
                        errors.pnNumbers[index] && (
                          <ErrorMessage
                            name={`pnNumbers[${index}]`}
                            component={TextError as React.ComponentType<{}>}
                          />
                        )}
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          Delete
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          push("");
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                  {errors && !Array.isArray(errors.pnNumbers) && (
                    <ErrorMessage
                      name="pnNumbers"
                      component={TextError as React.ComponentType<{}>}
                    />
                  )}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <div className={css["form-control"]}>
          <label htmlFor="password" className={css["dark-label"]}>
            Comments
          </label>
          <Field
            as="textarea"
            id="comments"
            name="comments"
            type="text"
            className={classNames(css["dark-input"])}
          />
          <ErrorMessage
            name="comments"
            component={TextError as React.ComponentType<{}>}
          />
        </div>
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
