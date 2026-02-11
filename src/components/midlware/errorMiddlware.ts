import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { RejectError } from "../utils/getErrorMessage";
import { registration } from "../../redux/auth/operations";

export const errorMiddlware: Middleware = () => {
  return (next) => {
    return (action) => {
      if (isRejectedWithValue(action)) {
        const payload = action.payload as RejectError | undefined;
       if (payload?.status === 409 && action.type === registration.rejected.type) {
          return next(action);
        }
        const message = payload?.message ?? "Unknown error";
        toast.error(message, {
          id: "global-error",
        });
      }
      return next(action);
    };
  };
};
