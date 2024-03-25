import { accessToken } from "./tokenSettings";

export const checkAndSetPersistedToken = (persistedToken: string | null) => {
  if (!persistedToken) {
    throw new Error("No saved token. Please log in.");
  }
  accessToken.setToken(persistedToken);
};
