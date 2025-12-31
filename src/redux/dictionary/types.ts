import type { Category } from "../filters/types";

export interface DictionaryState {
  words: Word[];
  totalPages: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  error: string | null;
}

export interface Word {
  _id?: string;
  en: string;
  ua: string;
  category: Category;
  isIrregular?: boolean;
}

export interface ApiFilterResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}
