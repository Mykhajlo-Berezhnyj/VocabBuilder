import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "./types";
import { getErrorMessage } from "../../components/utils/getErrorMessage";

export const fetchCategories = createAsyncThunk<Category[]>(
  "filters/categories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/words/categories");
      return response.data;
    } catch (error) {
   return thunkApi.rejectWithValue(getErrorMessage(error)); }
  }
);
