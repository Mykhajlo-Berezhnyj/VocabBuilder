import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { FiltersState } from "../filters/types";
import type {
  ApiUserDictionaryResponse,
  ApiUserTaskResponse,
  EditWordArgs,
  userAnswer,
  userAnswerResponse,
  UserWord,
  UserWordResponse,
} from "./types";

interface FetchWordsArgs {
  page: number;
  perPage: number;
  filters: FiltersState;
}

type ThunkConfig = {
  rejectValue: string;
};

export const fetchUserWords = createAsyncThunk<
  ApiUserDictionaryResponse,
  FetchWordsArgs,
  ThunkConfig
>(
  "userDictionary/fetchUserWords",
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
      const response = await axios.get("/words/own", { params });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message ?? error.message
        );
      }
      return thunkApi.rejectWithValue("Unexpected error occurred");
    }
  }
);

export const createUserWord = createAsyncThunk<
  UserWordResponse,
  UserWord,
  ThunkConfig
>("userDictionary/createUserWord", async (userWord: UserWord, thunkApi) => {
  try {
    const response = await axios.post("words/create", userWord);
    thunkApi.dispatch(fetchStatistics());
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unexpected error occurred");
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
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unexpected error occurred");
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
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unexpected error occurred");
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
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message ?? error.message
        );
      }
      return thunkApi.rejectWithValue("Unexpected error occured");
    }
  }
);

export const fetchStatistics = createAsyncThunk<number, void, ThunkConfig>(
  "userDictionary/statistic",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("words/statistics");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message ?? error.message
        );
      }
      return thunkApi.rejectWithValue("Unexpected error occured");
    }
  }
);

export const fetchAnswers = createAsyncThunk<
  ApiUserTaskResponse,
  void,
  ThunkConfig
>("userDictionary/fetchAnswers", async (_, thunkApi) => {
  try {
    const response = await axios.get("words/tasks");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unexpected error occured");
  }
});

export const postAnswers = createAsyncThunk<
  userAnswerResponse[],
  userAnswer[],
  ThunkConfig
>("userDictionary/postAnswers", async (answers, thunkApi) => {
  try {
    const response = await axios.post("words/answers", answers);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    }
    return thunkApi.rejectWithValue("Unexpected error occured");
  }
});
