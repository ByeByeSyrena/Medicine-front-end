import React, { useState } from "react";
import { Medicine, Pharmacy } from "../../@types/types";
import css from "./Catalog.module.css";

interface CatalogProps {
  medicines: Medicine[];
  onAddToCart: (item: Medicine) => void;
  displayAll: boolean;
  onePharm: Pharmacy;
}

const Catalog: React.FC<CatalogProps> = ({
  medicines,
  onAddToCart,
  displayAll,
  onePharm,
}) => {
  const arrayToRender = displayAll ? medicines : onePharm?.items ?? [];

  return (
    <ul className={css.grid}>
      {arrayToRender.map((item: Medicine) => (
        <li key={item._id} className={css.gridItem}>
          <img
            src={require("../../images/pill-bottle-311809_1280.png")}
            alt={item.item}
            className={css.image}
            style={{ objectFit: "contain" }}
          />
          <h3>{item.item}</h3>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <button type="button" onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Catalog;
