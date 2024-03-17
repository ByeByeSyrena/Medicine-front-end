import React, { useEffect } from "react";
import css from "./ShoppingCartPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/stores/selectors";

import OrderForm from "../../../components/ShoppingCartForm/ShoppingCartForm";
import CartList from "../../../components/CartList/CartList";
import { selectIsFetchingCurrentUser } from "../../../redux/auth/users/selectors";
import { AppDispatch } from "../../../redux/store";
import { logoutThunk } from "../../../redux/auth/users/operations";

const ShoppingCartPage = () => {
  const cartItems = useSelector(selectCart);
  const test = useSelector(selectIsFetchingCurrentUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(logoutThunk());
  };

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <section className={css.container}>
      <div>
        <h1>Fullfill order details</h1>
        <OrderForm cartItems={cartItems} />
      </div>
      <CartList cartItems={cartItems} />
      <button onClick={handleClick}>LOGOUT</button>
    </section>
  );
};

export default ShoppingCartPage;
