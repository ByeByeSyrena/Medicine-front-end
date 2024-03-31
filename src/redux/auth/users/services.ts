import { AxiosResponse } from "axios";
import { RegUser, LoginUser } from "../../../@types/types";
import axiosInstance from "../../apiSettings/axiosInstance";

export const createUserRequest = async (formData: RegUser) => {
  const response: AxiosResponse<{ message: string }> = await axiosInstance.post(
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

export const deleteUserRequest = async (userId: string) => {
  await axiosInstance.delete(`/users/${userId}`);
  return;
};

export const updateUserRequest = async (
  userId: string,
  updatedUserData: { name?: string; password?: string }
) => {
  if (updatedUserData?.name === "") {
    delete (updatedUserData as any).name;
  }

  if (updatedUserData?.password === "") {
    delete (updatedUserData as any).password;
  }

  console.log(updatedUserData);

  const response = await axiosInstance.patch(
    `/users/${userId}`,
    updatedUserData
  );

  return response;
};
