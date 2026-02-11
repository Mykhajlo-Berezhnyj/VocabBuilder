import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Answer, TasksState } from "./type";
import { fetchTasks, postAnswers } from "./operations";
import type { RejectError } from "../../components/utils/getErrorMessage";

const handlePending = (state: TasksState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: TasksState,
  action: PayloadAction<RejectError | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload?.message ?? "Unknown error";
};

const initialState: TasksState = {
  tasks: [],
  currentIndex: 0,
  answers: [],
  answerResponse: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    nextIndex(state) {
      if (state.currentIndex < state.tasks.length - 1) {
        state.currentIndex += 1;
      }
    },
    createAnswers(state, action: PayloadAction<Answer>) {
      state.answers.push(action.payload);
    },
    resetTraining() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = action.payload.tasks;
        state.currentIndex = 0;
      })
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(postAnswers.pending, handlePending)
      .addCase(postAnswers.fulfilled, (state: TasksState, action) => {
        state.isLoading = false;
        state.error = null;
        state.answerResponse = action.payload;
      })
      .addCase(postAnswers.rejected, handleRejected);
  },
});

export const { nextIndex, createAnswers, resetTraining } = tasksSlice.actions;

export default tasksSlice.reducer;
