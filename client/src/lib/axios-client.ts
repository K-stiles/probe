import { type CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  // timeout: 100000, // 100 seconds
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { data, status } = error.response;

      // Don't redirect on 401 for API calls, let React Query handle it
      // Only redirect if we're not already on an auth page
      if (
        status === 401 &&
        !window.location.pathname.match(
          /^\/(sign-in|sign-up|google\/oauth\/callback)?$/
        )
      ) {
        // Clear any cached auth state
        localStorage.clear();
        sessionStorage.clear();
        // Use history API instead of window.location to avoid page reload
        window.history.pushState({}, "", "/");
      }

      const customError: CustomError = {
        ...error,
        errorCode: data?.errorCode || "UNKNOWN_ERROR",
        message: data?.message || error.message,
      };

      return Promise.reject(customError);
    }

    // Network error or other issues
    return Promise.reject(error);
  }
);

export default API;
