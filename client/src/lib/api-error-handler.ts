import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

const checkAxiosErrorName = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: unknown }).name === "AxiosError"
  );
};

export const handleApiError = (error: unknown): ApiError => {
  const isAxiosError = axios.isAxiosError(error)
    ? (error as AxiosError)
    : checkAxiosErrorName(error);

  if (isAxiosError) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with error status
      const { status, data } = axiosError.response as {
        status: number;
        data: { message?: string; error?: string; code?: string };
      };

      return {
        message: data?.message || data?.error || "An error occurred",
        status,
        code: data?.code,
      };
    } else if (checkAxiosErrorName(error)) {
      return {
        message: (error as AxiosError).message || "Request failed",
        status: 0,
        code: "REQUEST_ERROR",
      };
    } else if (axiosError.request) {
      // Request made but no response received
      return {
        message: "Network error - please check your connection",
        status: 0,
        code: "NETWORK_ERROR",
      };
    }

    if (error instanceof Error) {
      // Non-axios error but still an Error instance
      return {
        message: error.message,
        status: 500,
        code: "REQUEST_ERROR",
      };
    }
  }

  // Non-axios error
  return {
    message: "An unexpected error occurred",
    status: 0,
    code: "UNKNOWN_ERROR",
  };
};
