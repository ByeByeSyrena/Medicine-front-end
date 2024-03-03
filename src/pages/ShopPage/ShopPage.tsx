import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Medicine, Pharmacy } from "../../@types/types";
import { AppDispatch } from "../../redux/store";
import { getAllStores, getOneStore } from "../../redux/stores/operations";
import { selectAllStores, selectOneStore } from "../../redux/stores/selectors";
import { addToCart } from "../../redux/stores/storesSlice";
import css from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dispatchCart = useDispatch();
  const storesAndDrugs = useSelector(selectAllStores);
  const onePharmacy = useSelector(selectOneStore);

  const [displayAll, setDisplayAll] = useState<boolean>(true);

  const medicines = storesAndDrugs.flatMap((store: Pharmacy) => store.items);

  console.log(medicines);

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  const handleAllClick = () => {
    dispatch(getAllStores());
    setDisplayAll(true);
  };

  const handleOneStoreClick = (id: string) => {
    dispatch(getOneStore(id));
    setDisplayAll(false);
  };

  const handleAddToCartClick = (item: Medicine) => {
    dispatchCart(addToCart(item));
  };

  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <div className={css.storesPositioning}>
          <h1>Stores</h1>
          <div>
            <button onClick={handleAllClick}>All</button>
            {storesAndDrugs &&
              storesAndDrugs.map((item: Pharmacy) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleOneStoreClick(item._id ?? "")}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      </aside>
      <div className={css.willbelist}>
        <ul className={css.grid}>
          {displayAll
            ? medicines.map((item: Medicine) => (
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
                  <button
                    type="button"
                    onClick={() => handleAddToCartClick(item)}
                  >
                    Add to Cart
                  </button>
                </li>
              ))
            : onePharmacy?.items.map((item: Medicine) => (
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
                  <button
                    type="button"
                    onClick={() => handleAddToCartClick(item)}
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopPage;
