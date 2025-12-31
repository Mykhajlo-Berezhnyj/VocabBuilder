import type { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectError = (state: RootState) => state.auth.error;

export const selectExistingEmail = (state: RootState) =>
  state.auth.existingEmail;

export const selectUser = (state: RootState) => state.auth.user;
