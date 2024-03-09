import React from "react";
import { Pharmacy } from "../../@types/types";
import css from "./StoresList.module.css";

interface StoresListProps {
  stores: Pharmacy[];
  onAllClick: () => void;
  onStoreClick: (id: string) => void;
}

const StoresList: React.FC<StoresListProps> = ({
  stores,
  onAllClick,
  onStoreClick,
}) => {
  return (
    <div className={css.background}>
      <h1>Stores</h1>
      <div className={css.scrollWrapper}>
        <button onClick={onAllClick}>All</button>
        {stores &&
          stores.map((item: Pharmacy) => (
            <button
              type="button"
              key={item.name}
              onClick={() => onStoreClick(item._id ?? "")}
            >
              {item.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default StoresList;
