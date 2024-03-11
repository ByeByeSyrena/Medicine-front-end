import axios, { AxiosResponse } from "axios";
import { User } from "../../../@types/types";

const userInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    Authorization: "Bearer",
  },
});

export interface loginType {
  email: string;
  password: string;
}

export const requestRegister = async (formData: User) => {
  const { data } = await userInstance.post("/users/register", formData);

  return data;
};

// export const requestLogin = async (formData: loginType) => {
//   const { data } = await userInstance.post("users/login", formData);

//   return data;
// };

export const requestLogout = async () => {
  const { data } = await userInstance.post("users/logout");

  return data;
};

export const requestCurrent = async () => {
  const { data } = await userInstance.get("users/current");

  return data;
};

export const requestRemove = async () => {
  const { data } = await userInstance.delete("users/:id");

  return data;
};

export const requestUpdate = async (formData: User) => {
  const { data } = await userInstance.patch("users/:id", formData);

  return data;
};
