import { AxiosResponse } from "axios";
import { RegUser, createAnswer, LoginUser } from "../../../@types/types";
import axiosInstance from "../../apiSettings/axiosInstance";

export const createUserRequest = async (formData: RegUser) => {
  const response: AxiosResponse<createAnswer> = await axiosInstance.post(
    "/users/register",
    formData
  );
  return response;
};

export const loginUserRequest = async (formData: LoginUser) => {
  const response = await axiosInstance.post("/users/login", formData);
  console.log(response);
  return response;
};

export const logoutUserRequest = async () => {
  await axiosInstance.get("/users/logout");
  return;
};

export const refreshTokensRequest = async () => {
  const response = await axiosInstance.get("/users/refresh");
  return response;
};
