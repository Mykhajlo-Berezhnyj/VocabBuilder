import type { RootState } from "../store";

export const selectCategory = (state: RootState) => state.filters.category;

export const selectIsIrregular = (state: RootState) =>
  state.filters.isIrregular;

export const selectIsLoading = (state: RootState) => state.filters.isLoading;

export const selectError = (state: RootState) => state.filters.error;

export const selectSelectedFilters = (state: RootState) =>
  state.filters.selectedFilters;
