import { isAxiosError } from "axios";

export type RejectError = {
  message: string;
  status?: number;
};

export function getErrorMessage(error: unknown): RejectError {
  if (isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ?? error.message ?? "Unknown error",
      status: error.response?.status,
    };
  } else if (error instanceof Error) {
    return { message: error.message };
  } else if (typeof error === "string") {
    return { message: error };
  }
  return { message: "Unknown error" };
}
