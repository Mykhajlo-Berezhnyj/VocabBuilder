import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import type { RejectError } from "../utils/getErrorMessage";
import type { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/auth/operations";

export const authErrorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const payload = (action.payload as RejectError) || undefined;

      if (action.type.includes("/login")) {
        return next(action);
      }
      if (payload?.status === 401) {
        (dispatch as AppDispatch)(logout());
      }
    }
    return next(action);
  };
