import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addUserWord,
  createUserWord,
  deleteWord,
  editUserWord,
  fetchAnswers,
  fetchStatistics,
  fetchUserWords,
} from "./operations";
import type { UserDictionaryState } from "./types";

const handlePending = (state: UserDictionaryState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: UserDictionaryState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = (action.payload as string) ?? "Unknown error";
};

const initialState: UserDictionaryState = {
  words: [],
  totalPages: 0,
  page: 1,
  perPage: 10,
  totalCount: 0,
  isLoading: false,
  error: null,
};

const userDictionarySlice = createSlice({
  name: "userDictionary",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWords.pending, handlePending)
      .addCase(
        fetchUserWords.fulfilled,
        (state: UserDictionaryState, action) => {
          state.isLoading = false;
          state.error = null;
          state.words = action.payload.results;
          state.totalPages = action.payload.totalPages;
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
        }
      )
      .addCase(fetchUserWords.rejected, handleRejected)
      .addCase(createUserWord.pending, handlePending)
      .addCase(
        createUserWord.fulfilled,
        (state: UserDictionaryState, action) => {
          state.isLoading = false;
          state.error = null;
          state.words.push(action.payload);
        }
      )
      .addCase(createUserWord.rejected, handleRejected)
      .addCase(addUserWord.pending, handlePending)
      .addCase(addUserWord.fulfilled, (state: UserDictionaryState, action) => {
        state.isLoading = false;
        state.error = null;
        state.words.push(action.payload);
      })
      .addCase(addUserWord.rejected, handleRejected)
      .addCase(editUserWord.pending, handlePending)
      .addCase(editUserWord.fulfilled, (state: UserDictionaryState, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.words.findIndex(
          (word) => word._id === action.payload._id
        );
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })
      .addCase(editUserWord.rejected, handleRejected)
      .addCase(deleteWord.pending, handlePending)
      .addCase(deleteWord.fulfilled, (state: UserDictionaryState, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = state.words.filter(
          (word) => word._id !== action.payload.id
        );
      })
      .addCase(deleteWord.rejected, handleRejected)
      .addCase(fetchStatistics.pending, handlePending)
      .addCase(
        fetchStatistics.fulfilled,
        (state: UserDictionaryState, action) => {
          state.isLoading = false;
          state.error = null;
          state.totalCount = action.payload;
        }
      )
      .addCase(fetchStatistics.rejected, handleRejected);
  },
});

export default userDictionarySlice.reducer;
