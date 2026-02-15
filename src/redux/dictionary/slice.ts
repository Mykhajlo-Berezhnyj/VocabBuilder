import { createSlice } from "@reduxjs/toolkit";
import { fetchWords } from "./operations";
import type { DictionaryState } from "./types";
import type { RejectError } from "../../components/utils/getErrorMessage";

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
  perPage: 7,
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    changePerPage(state, action) {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, handlePending)
      .addCase(fetchWords.fulfilled, (state: DictionaryState, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchWords.rejected, (state: DictionaryState, action) => {
        handleRejected(state);
        state.error = (action.payload as RejectError) ?? "Unknown error";
      });
  },
});

export const { changePage, changePerPage } = dictionarySlice.actions;

export default dictionarySlice.reducer;
