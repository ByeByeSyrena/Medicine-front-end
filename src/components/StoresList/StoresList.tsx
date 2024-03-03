import React from "react";
import { Pharmacy } from "../../@types/types";

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
    <div>
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
  );
};

export default StoresList;
