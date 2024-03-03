import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Medicine } from "../../@types/types";
import {
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/stores/storesSlice";
import { ReactComponent as Plus } from "../../images/plus-small.svg";
import { ReactComponent as Minus } from "../../images/minus-small.svg";
import css from "./CartList.module.css";

interface CartListProps {
  cartItems: Medicine[];
}

const CartList: React.FC<CartListProps> = ({ cartItems }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteFromCartClick = (id: string) => {
    dispatch(deleteFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className={css.shopPage}>
      <ul className={css.cartList}>
        {cartItems &&
          cartItems.map((item: Medicine) => (
            <li key={item._id} className={css.cartLi}>
              <img
                src={require("../../images/pill-bottle-311809_1280.png")}
                alt={item.item}
                className={css.image}
                style={{ objectFit: "contain" }}
              />
              <div className={css.itemInnerDiv}>
                <h3>{item.item}</h3>
                <p>${item.price} per 1</p>
                <div className={css.counter}>
                  <button
                    className={css.darkButton}
                    type="button"
                    onClick={() => handleDecreaseQuantity(item._id as string)}
                  >
                    <Minus className={css.svg} />
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={item.amount}
                    readOnly
                    className={css["quantity-input"]}
                  />
                  <button
                    className={css.darkButton}
                    type="button"
                    onClick={() => handleIncreaseQuantity(item._id as string)}
                  >
                    <Plus className={css.svg} />
                  </button>
                </div>
                <button
                  className={css.removeButton}
                  type="button"
                  onClick={() => handleDeleteFromCartClick(item._id as string)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CartList;
