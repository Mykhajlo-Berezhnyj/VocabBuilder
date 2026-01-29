import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Answer, AnswerResponse, ApiTaskResponse } from "./type";
import type { ThunkConfig } from "../userDictionary/operations";
import { getErrorMessage } from "../../components/utils/getErrorMessage";

export const fetchTasks = createAsyncThunk<ApiTaskResponse, void, ThunkConfig>(
  "tasks/fetchAnswers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("words/tasks");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const postAnswers = createAsyncThunk<
  AnswerResponse[],
  Answer[],
  ThunkConfig
>("tasks/postAnswers", async (answers, thunkApi) => {
  try {
    const response = await axios.post("words/answers", answers);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
