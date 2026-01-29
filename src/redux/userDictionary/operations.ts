import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Filter } from "../filters/types";
import type {
  ApiUserDictionaryResponse,
  EditWordArgs,
  UserWord,
  UserWordResponse,
} from "./types";
import { getErrorMessage, type RejectError } from "../../components/utils/getErrorMessage";
import axios from "axios";

interface FetchWordsArgs {
  page: number;
  perPage: number;
  filters: Filter;
}

export type ThunkConfig = {
  rejectValue: RejectError;
};

export const fetchUserWords = createAsyncThunk<
  ApiUserDictionaryResponse,
  FetchWordsArgs,
  ThunkConfig
>(
  "userDictionary/fetchUserWords",
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
      const response = await axios.get("/words/own", { params });
      return response.data;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createUserWord = createAsyncThunk<
  UserWordResponse,
  UserWord,
  ThunkConfig
>("userDictionary/createUserWord", async (userWord, thunkApi) => {
  try {
    const response = await axios.post("words/create", userWord);
    thunkApi.dispatch(fetchStatistics());
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const addUserWord = createAsyncThunk<
  UserWordResponse,
  string,
  ThunkConfig
>("userDictionary/addUserWord", async (id, thunkApi) => {
  try {
    const response = await axios.post(`words/add/${id}`);
    thunkApi.dispatch(fetchStatistics());
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const editUserWord = createAsyncThunk<
  UserWordResponse,
  EditWordArgs,
  ThunkConfig
>("userDictionary/editUserWord", async ({ id, userWord }, thunkApi) => {
  try {
    const response = await axios.patch(`words/edit/${id}`, userWord);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

type deleteResponse = {
  message: string;
  id: string;
};

export const deleteWord = createAsyncThunk<deleteResponse, string, ThunkConfig>(
  "userDictionary/deleteWord",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`words/delete/${id}`);
      thunkApi.dispatch(fetchStatistics());
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchStatistics = createAsyncThunk<number, void, ThunkConfig>(
  "userDictionary/statistic",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("words/statistics");
      return response.data.totalCount;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);
