import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiAuthResponse } from "./types";
import {
  getErrorMessage,
  type RejectError,
} from "../../components/utils/getErrorMessage";
import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registration = createAsyncThunk<
  ApiAuthResponse,
  { name: string; email: string; password: string },
  { rejectValue: RejectError }
>("auth/register", async (credential, thunkApi) => {
  try {
    const response = await axios.post("/users/signup", credential);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const login = createAsyncThunk<
  ApiAuthResponse,
  { email: string; password: string },
  { rejectValue: RejectError }
>("auth/login", async (credential, thunkApi) => {
  try {
    const response = await axios.post("/users/signin", credential);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const refreshUser = createAsyncThunk<
  ApiAuthResponse,
  void,
  { state: RootState; rejectValue: RejectError }
>("auth/refresh", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const persistToken = state.auth?.token;

  if (persistToken === null) {
    return thunkApi.rejectWithValue({ message: "No token" });
  }

  try {
    setAuthHeader(persistToken);
    const response = await axios.get("/users/current");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: RejectError }
>("auth/logout", async (_, thunkApi) => {
  try {
    await axios.post("users/signout");
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
