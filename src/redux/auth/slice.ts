import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { login, logout, refreshUser, registration } from "./operations";
import type { ApiAuthResponse, AuthState } from "./types";

const handlePending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: AuthState) => {
  state.isLoading = false;
  state.isRefreshing = false;
};

const handleAuthFulfilled = (
  state: AuthState,
  action: PayloadAction<ApiAuthResponse>,
) => {
  state.isLoading = false;
  state.error = null;
  state.user = { name: action.payload.name, email: action.payload.email };
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const handleLogOut = (state: AuthState) => {
  state.isLoading = false;
  state.error = null;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
  state.isRefreshing = false;
};

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  existingEmail: null,
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAuth(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = null;
    },
    clearExistingEmail(state) {
      state.existingEmail = null;
    },
    addExistingEmail(state, action) {
      state.existingEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, handlePending)
      .addCase(registration.fulfilled, handleAuthFulfilled)
      .addCase(registration.rejected, (state, action) => {
        handleRejected(state);
        state.error =
          action.payload ?? {message: "Registration failed"};
      })
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleAuthFulfilled)
      .addCase(login.rejected, (state, action) => {
        handleRejected(state);
        state.error = action.payload ?? {message: "Login failed"};
      })
      .addCase(refreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, handleAuthFulfilled)
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error =
          action.payload ?? {message: "Refresh failed"};
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, handleLogOut)
      .addCase(logout.rejected, (state, action) => {
        handleLogOut(state);
        state.error =
          action.payload ?? {message: "Logout failed"};
      });
  },
});

export const { clearAuth, clearExistingEmail, addExistingEmail } =
  authSlice.actions;
export default authSlice.reducer;
