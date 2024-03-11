// OLD TYPES - IN USE NOW 3/11

export type Medicine = {
  _id?: string;
  item: string;
  quantity: string;
  price: string | number;
  amount?: number;
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
  pnNumbers: string[];
  address: string;
  comments?: string;
  totalPrice: number;
  medicines: Medicine[];
};

// NEW TYPES

export type User = {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  role?: string;
  favorites?: string[];
  seller?: string;
  token?: string;
};
