import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { RejectError } from "../utils/getErrorMessage";
import { login, registration } from "../../redux/auth/operations";

export const errorMiddlware: Middleware = () => {
  return (next) => {
    return (action) => {
      if (isRejectedWithValue(action)) {
        const payload = action.payload as RejectError | undefined;
        if (
          payload?.status === 409 &&
          action.type === registration.rejected.type
        ) {
          return next(action);
        }
        let message = payload?.message ?? "Unknown error";

        if (payload?.status === 401 && action.type !== login.rejected.type)
          message = "You are not authorized. Please sign in again";

        toast.error(message, {
          id: "global-error",
        });
      }
      return next(action);
    };
  };
};
