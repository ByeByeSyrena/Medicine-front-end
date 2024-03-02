export type Medicine = {
  _id?: string;
  item: string;
  quantity: string;
  price: string;
};

export type Pharmacy = {
  _id?: string;
  name: string;
  items: Medicine[];
};

export type Order = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  medicines: Medicine[];
};
