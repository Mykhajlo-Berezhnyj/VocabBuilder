import type { RootState } from "../store";

export const selectWords = (state: RootState) => state.userDictionary.words;

export const selectTotalPages = (state: RootState) =>
  state.userDictionary.totalPages;

export const selectTotalCount = (state: RootState) =>
  state.userDictionary.totalCount;

export const selectIsLoading = (state: RootState) =>
  state.userDictionary.isLoading;

export const selectError = (state: RootState) => state.userDictionary.error;

export const selectPage = (state: RootState) => state.userDictionary.page;

export const selectPerPage = (state: RootState) => state.userDictionary.perPage;

// export const selectEditingWord = (state: RootState) =>
//   state.userDictionary.editingWord;
