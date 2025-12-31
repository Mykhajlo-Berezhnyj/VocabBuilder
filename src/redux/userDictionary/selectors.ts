import type { RootState } from "../store";

export const selectWords = (state: RootState) => state.dictionary.words;

export const selectTotalPages = (state: RootState) =>
  state.dictionary.totalPages;

export const selectIsLoading = (state: RootState) => state.dictionary.isLoading;

export const selectError = (state: RootState) => state.dictionary.error;

export const selectPage = (state: RootState) => state.dictionary.page;

export const selectPerPage = (state: RootState) => state.dictionary.perPage;
