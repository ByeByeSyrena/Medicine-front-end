import React, { useEffect } from "react";
import css from "./ShoppingCartPage.module.css";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { selectCart, selectTotalPrice } from "../../../redux/stores/selectors";
import { getTotalPrice } from "../../../redux/stores/storesSlice";

import OrderForm from "../../../components/Form/Form";
import CartList from "../../../components/CartList/CartList";

const ShoppingCartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCart);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [totalPrice, dispatch]);

  return (
    <section className={css.container}>
      <div>
        <h1>Fullfill order details</h1>
        <OrderForm cartItems={cartItems} totalPrice={totalPrice} />
      </div>
      <CartList cartItems={cartItems} />
    </section>
  );
};

export default ShoppingCartPage;
