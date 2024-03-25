import axios from "axios";

export const accessToken = {
  setToken(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unsetToken() {
    axios.defaults.headers.common.Authorization = "";
  },
};
