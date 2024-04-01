import { AxiosResponse } from "axios";
import { RegUser, LoginUser } from "../../../@types/types";
import axiosInstance from "../../apiSettings/axiosInstance";

export const createPharmacyRequest = async (formData: RegUser) => {
  const response: AxiosResponse<{ message: string }> = await axiosInstance.post(
    "/pharmacies/register",
    formData
  );
  return response;
};

export const loginPharmRequest = async (formData: LoginUser) => {
  const response = await axiosInstance.post("/pharmacies/login", formData);
  return response;
};

export const refreshTokensRequest = async () => {
  const response = await axiosInstance.get("/pharmacies/refresh");
  return response;
};
