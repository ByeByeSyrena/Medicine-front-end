// OLD TYPES - IN USE NOW 3/11

export type Medicine = {
  _id?: string;
  item: string;
  quantity: string;
  price: string | number;
  amount?: number;
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

// USER

export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  roles: string[];
  favorites: string[];
  seller: string | null;
};

export interface foundUser {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  seller: string;
  avatar: string;
}

export type RegUser = Required<Pick<User, "email" | "name" | "password">>;

export type LoginUser = Required<Pick<User, "email" | "password">>;

export interface ReturnedUser {
  foundUser: foundUser;
  accessToken: string;
}

export interface UpdatedUser {
  name: string;
  roles: string[];
  accessToken: string;
}

export interface ApiError {
  status: number;
  message: string;
}

//PHARMACY

export type Pharmacy = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  roles: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface ReturnedPharmacy {
  foundPharmacy: foundUser;
  accessToken: string;
}
