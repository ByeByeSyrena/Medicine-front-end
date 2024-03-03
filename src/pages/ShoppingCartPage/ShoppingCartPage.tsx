import React, { useEffect } from "react";
import css from "./ShoppingCartPage.module.css";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectCart, selectTotalPrice } from "../../redux/stores/selectors";
import { getTotalPrice } from "../../redux/stores/storesSlice";

import Form from "../../components/Form/Form";
import CartList from "../../components/CartList/CartList";

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
        <Form cartItems={cartItems} totalPrice={totalPrice} />
      </div>
      <CartList cartItems={cartItems} />

      <div>
        <div className={css.totalPriceWrapper}>
          <div className={css.totalPrice}>
            <span>Total Price: ${totalPrice}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartPage;
