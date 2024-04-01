import React from "react";
import css from "./ShoppingCartPage.module.css";

import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/stores/selectors";

import { OrderForm, CartList } from "../../../components/components";

const ShoppingCartPage = () => {
  const cartItems = useSelector(selectCart);

  return (
    <section className={css.container}>
      <div className={css.orderFormWrapper}>
        <h1>Fullfill order details</h1>
        <OrderForm cartItems={cartItems} />
      </div>
      <CartList cartItems={cartItems} />
    </section>
  );
};

export default ShoppingCartPage;
