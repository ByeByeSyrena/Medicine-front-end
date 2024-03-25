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

// USER NEW

export type User = {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  roles?: string[];
  favorites?: string[];
  seller?: string | null;
  token?: string;
};

export interface foundUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  seller?: string;
}

export interface RegUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RefreshedUser {
  foundUser: foundUser;
  accessToken: string;
}

export interface createAnswer {
  user: RegUser;
  message: string;
}
