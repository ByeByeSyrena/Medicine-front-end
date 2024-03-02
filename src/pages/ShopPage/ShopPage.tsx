import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllStores, getOneStore } from "../../redux/stores/operations";
import { selectAllStores, selectOneStore } from "../../redux/stores/selectors";
import css from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storesAndDrugs = useSelector(selectAllStores);
  const onePharmacy = useSelector(selectOneStore);
  const medicines = storesAndDrugs.flatMap((store) => store.items);

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

  const [displayAll, setDisplayAll] = useState<boolean>(true);

  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <div className={css.storesPositioning}>
          <h1>Stores</h1>
          <div>
            <button onClick={handleAllClick}>All</button>
            {storesAndDrugs &&
              storesAndDrugs.map((item) => (
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
            ? medicines.map((item) => (
                <li key={item._id} className={css.gridItem}>
                  <img
                    src={require("../../images/pill-bottle-311809_1280.png")}
                    alt={item.item}
                    className={css.image}
                    style={{ objectFit: "contain" }}
                  />
                  <h3>{item.item}</h3>
                  <p>{item.quantity}</p>
                  <button type="button">Add to Cart</button>
                </li>
              ))
            : onePharmacy?.items.map((item) => (
                <li key={item._id} className={css.gridItem}>
                  <img
                    src={require("../../images/pill-bottle-311809_1280.png")}
                    alt={item.item}
                    className={css.image}
                    style={{ objectFit: "contain" }}
                  />
                  <h3>{item.item}</h3>
                  <p>{item.quantity}</p>
                  <button type="button">Add to Cart</button>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopPage;
