import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, isAxiosError } from "axios";
import type { RootState } from "../store";
import type { ApiAuthResponse } from "./types";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registration = createAsyncThunk<
  ApiAuthResponse,
  { name: string; email: string; password: string },
  { rejectValue: AxiosError }
>("auth/register", async (credential, thunkApi) => {
  try {
    const response = await axios.post("/users/signup", credential);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Registration error:", error);
      return thunkApi.rejectWithValue(error);
    }
    return thunkApi.rejectWithValue(new AxiosError("Unknown error"));
  }
});

export const login = createAsyncThunk<
  ApiAuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credential, thunkApi) => {
  try {
    const response = await axios.post("/users/signin", credential);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Login error:", error.response?.data);
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Unknown error");
  }
});

export const refreshUser = createAsyncThunk<
  ApiAuthResponse,
  void,
  { state: RootState; rejectValue: string }
>("auth/refresh", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const persistToken = state.auth?.token;

  if (persistToken === null) {
    return thunkApi.rejectWithValue("No token");
  }

  try {
    setAuthHeader(persistToken);
    const response = await axios.get("/users/current");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unknown error");
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await axios.post("users/logout");
      clearAuthHeader();
    } catch (error) {
      clearAuthHeader();
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error");
    }
  }
);
