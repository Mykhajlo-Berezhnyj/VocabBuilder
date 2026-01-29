import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiFilterResponse } from "../dictionary/types";
import axios from "axios";
import type { Filter } from "../filters/types";
import { getErrorMessage } from "../../components/utils/getErrorMessage";

interface FetchWordsArgs {
  page: number;
  perPage: number;
  filters: Filter;
}

export const fetchWords = createAsyncThunk<ApiFilterResponse, FetchWordsArgs>(
  "dictionary/fetchWords",
  async ({ page, perPage, filters }, thunkApi) => {
    const { keyword, category, isIrregular } = filters;
    const params = {
      page: page,
      perPage: perPage,
      keyword: keyword || undefined,
      category: category || undefined,
      isIrregular: category === "verb" ? isIrregular : undefined,
    };
    try {
      const response = await axios.get("/words/all", { params });
      return response.data;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error)); }
  }
);
