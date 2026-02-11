import type { RejectError } from "../../components/utils/getErrorMessage";
import type { CategoryNotVerb } from "../filters/types";

type UserWordBase = {
  en: string;
  ua: string;
};

type UserWordVerb = UserWordBase & {
  category: "verb";
  isIrregular: boolean;
};

type UserWordNotVerb = UserWordBase & {
  category: CategoryNotVerb;
};

export type UserWord = UserWordNotVerb | UserWordVerb;

export type UserWordResponse = UserWord & {
  _id: string;
  owner: string;
  progress: number;
};

export interface UserDictionaryState {
  words: UserWordResponse[];
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
