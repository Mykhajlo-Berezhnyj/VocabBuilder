import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiFilterResponse } from "../dictionary/types";
import axios, { isAxiosError } from "axios";
import type { FiltersState } from "../filters/types";

interface FetchWordsArgs {
  page: number;
  perPage: number;
  filters: FiltersState;
}

export const fetchWords = createAsyncThunk<ApiFilterResponse, FetchWordsArgs>(
  "dictionary/fetchWords",
  async ({ page, perPage, filters }, thunkApi) => {
    const { selectedFilters, isIrregular } = filters;
    const params = {
      page: page,
      perPage: perPage,
      keyword: selectedFilters.keyword || undefined,
      category: selectedFilters.categories || undefined,
      isIrregular:
        selectedFilters.categories === "verb" ? isIrregular : undefined,
    };
    try {
      const response = await axios.get("/words/all", { params });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
);
