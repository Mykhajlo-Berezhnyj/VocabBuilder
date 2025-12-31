import { createSlice } from "@reduxjs/toolkit";
import type { FiltersState } from "./types";
import { fetchCategory } from "./operations";

const initialState: FiltersState = {
  category: [],
  isIrregular: undefined,
  selectedFilters: {
    keyword: "",
    categories: null,
  },
  isLoading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategories(state, action) {
      state.selectedFilters.categories = action.payload;
    },
    setSearch(state, action) {
      state.selectedFilters.keyword = action.payload;
    },
    resetSearch(state) {
      state.selectedFilters.keyword = "";
    },
    resetCategories(state) {
      state.selectedFilters.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategories, setSearch, resetCategories, resetSearch } =
  filterSlice.actions;
export default filterSlice.reducer;
