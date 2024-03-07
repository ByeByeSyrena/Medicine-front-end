import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Medicine, Pharmacy } from "../../../@types/types";
import Catalog from "../../../components/Catalog/Catalog";
import StoresList from "../../../components/StoresList/StoresList";
import { AppDispatch } from "../../../redux/store";
import { getAllStores, getOneStore } from "../../../redux/stores/operations";
import {
  selectAllStores,
  selectOneStore,
} from "../../../redux/stores/selectors";
import { addToCart, getTotalPrice } from "../../../redux/stores/storesSlice";
import css from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dispatchCart = useDispatch();
  const storesAndDrugs = useSelector(selectAllStores);
  const onePharmacy = useSelector(selectOneStore);

  const [displayAll, setDisplayAll] = useState<boolean>(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  useEffect(() => {
    const allMeds = storesAndDrugs.flatMap((store: Pharmacy) => store.items);
    setMedicines(allMeds);
  }, [storesAndDrugs]);

  const handleAllClick = () => {
    setDisplayAll(true);
  };

  const handleOneStoreClick = (id: string) => {
    dispatch(getOneStore(id));
    setDisplayAll(false);
  };

  const handleAddToCartClick = (item: Medicine) => {
    dispatchCart(addToCart(item));
    dispatch(getTotalPrice());
  };

  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <div className={css.storesPositioning}>
          <h1>Stores</h1>
          <StoresList
            stores={storesAndDrugs}
            onAllClick={handleAllClick}
            onStoreClick={handleOneStoreClick}
          />
        </div>
      </aside>
      <div className={css.willbelist}>
        <Catalog
          medicines={medicines}
          onAddToCart={handleAddToCartClick}
          displayAll={displayAll}
          onePharm={onePharmacy as Pharmacy}
        />
      </div>
    </section>
  );
};

export default ShopPage;