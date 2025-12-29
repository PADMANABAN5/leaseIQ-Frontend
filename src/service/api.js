import axios from "axios";
import { showError } from "./toast";

let isLoggingOut = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    const token = sessionStorage.getItem("token");

    if (
      token &&
      (status === 401 || status === 403) &&
      !isLoggingOut
    ) {
      isLoggingOut = true;

      showError(message || "Session expired. Please log in again.");

      setTimeout(() => {
        sessionStorage.clear();
        window.location.href = "/";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
