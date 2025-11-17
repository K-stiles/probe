import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Error handler utility
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
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
        // field: data?.field,
      };
    } else if (axiosError.request) {
      // Request made but no response received
      return {
        message: "Network error - please check your connection",
        status: 524, // 524 A Timeout Occurred
        code: "NETWORK_ERROR",
      };
    } else {
      // Something else happened
      return {
        message: axiosError.message || "Request failed",
        status: 500,
        code: "REQUEST_ERROR",
      };
    }
  }

  if (error instanceof Error) {
    // Non-axios error but still an Error instance
    return {
      message: error.message,
      status: 500,
      code: "UNKNOWN_ERROR",
    };
  }

  // Non-axios error
  return {
    message: "An unexpected error occurred",
    status: 500,
    code: "UNKNOWN_ERROR",
  };
};
