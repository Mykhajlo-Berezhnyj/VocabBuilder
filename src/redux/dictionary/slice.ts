import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";
import type { DictionaryState } from "./types";

const handlePending = (state: DictionaryState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: DictionaryState) => {
  state.isLoading = false;
};

const initialState: DictionaryState = {
  words: [],
  totalPages: 0,
  page: 1,
  perPage: 10,
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, handlePending)
      .addCase(fetchWords.fulfilled, (state: DictionaryState, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchWords.rejected, (state: DictionaryState, action) => {
        handleRejected(state);
        state.error = (action.payload as string) ?? "Unknown error";
      });
  },
});

export default dictionarySlice.reducer;
