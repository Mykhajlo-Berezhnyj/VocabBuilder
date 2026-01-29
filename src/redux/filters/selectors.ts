import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Option } from "./types";

export const selectCategories = (state: RootState) => state.filters.categories;

export const selectIsIrregular = (state: RootState) =>
  state.filters.selectedFilters.isIrregular;

export const selectIsLoading = (state: RootState) => state.filters.isLoading;

export const selectError = (state: RootState) => state.filters.error;

export const selectSelectedFilters = (state: RootState) =>
  state.filters.selectedFilters;

export const selectOptions = createSelector(
  [selectCategories],
  (categories): Option[] =>
    categories.map((cat) => ({
      value: cat,
      label: cat,
    }))
);
