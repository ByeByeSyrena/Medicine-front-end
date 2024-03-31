import axiosInstance from "./axiosInstance";

export const accessToken = {
  setToken(token: string) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unsetToken() {
    axiosInstance.defaults.headers.common.Authorization = "";
  },
};
