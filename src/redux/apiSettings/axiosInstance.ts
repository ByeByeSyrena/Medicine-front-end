import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3001/api/v1",
  // baseURL: "https://medicine-backend-2.onrender.com/api/v1",
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers["set-cookie"]) {
      const cookies = response.headers["set-cookie"];
      const jwtCookie = cookies.find((cookie: string) =>
        cookie.includes("jwt=")
      );

      if (jwtCookie) {
        const token = jwtCookie.split("jwt=")[1].split(";")[0];
      }
    }
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
