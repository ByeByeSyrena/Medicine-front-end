import { ApiError } from "../../@types/types";

export const handleApiError = (error: any): ApiError => {
  if (error.response && error.response.status) {
    const message = error.response.data?.message || "Unknown error";

    return { message, status: error.response.status };
  } else {
    return { message: "Server error", status: 500 };
  }
};
