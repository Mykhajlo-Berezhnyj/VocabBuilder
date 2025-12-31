import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { Category } from "./types";

export const fetchCategory = createAsyncThunk<Category[]>(
  "filters/category",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/words/categories");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
);
