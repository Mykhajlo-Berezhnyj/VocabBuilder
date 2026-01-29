import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, FiltersState } from "./types";
import { fetchCategories } from "./operations";

const initialState: FiltersState = {
  categories: [],
  selectedFilters: {
    keyword: "",
    category: null,
  },
  isLoading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category | null>) {
      const category = action.payload;
      if (category == "verb") {
        state.selectedFilters = {
          keyword: state.selectedFilters.keyword,
          category: "verb",
          isIrregular: false,
        };
      } else {
        state.selectedFilters = {
          keyword: state.selectedFilters.keyword,
          category,
        };
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.selectedFilters.keyword = action.payload;
    },
    resetSearch(state) {
      state.selectedFilters.keyword = "";
    },
    resetCategories(state) {
      state.selectedFilters = {
        keyword: state.selectedFilters.keyword,
        category: null,
      };
    },
    setIsIrregular(state, action: PayloadAction<boolean>) {
      if (state.selectedFilters.category === "verb") {
        state.selectedFilters.isIrregular = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCategories,
  setSearch,
  resetCategories,
  resetSearch,
  setIsIrregular,
} = filterSlice.actions;
export default filterSlice.reducer;
