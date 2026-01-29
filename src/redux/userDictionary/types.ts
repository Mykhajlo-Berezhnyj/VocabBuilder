import type { RejectError } from "../../components/utils/getErrorMessage";
import type { Category } from "../filters/types";

export interface UserWord {
  en: string;
  ua: string;
  category: Category;
  isIrregular?: boolean;
}

export interface UserWordResponse {
  _id: string;
  en: string;
  ua: string;
  category: Category;
  isIrregular?: boolean;
  owner: string;
  progress: number;
}

export interface UserDictionaryState {
  words: UserWordResponse[];
  // editingWord: UserWordResponse | null;
  totalPages: number;
  page: number;
  perPage: number;
  totalCount: number;
  isLoading: boolean;
  error: RejectError | null;
}

export interface ApiUserDictionaryResponse {
  results: UserWordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface EditWordArgs {
  id: string;
  userWord: UserWord;
}
