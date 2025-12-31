import type { Category } from "../filters/types";

export interface UserWord {
  en: string;
  ua: string;
  category: Category;
  isIrregular?: boolean;
}

export interface UserWordResponse {
  _id?: string;
  en: string;
  ua: string;
  category: Category;
  isIrregular?: boolean;
  owner: string;
  progress: number;
}

export interface UserDictionaryState {
  words: UserWordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface ApiUserDictionaryResponse {
  results: UserWordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface userTask {
  _id: string;
  ua: string;
  task: string;
}

export interface ApiUserTaskResponse {
  words: userTask[];
}

export interface userAnswer {
  _id: string;
  en: string;
  ua: string;
  task: string;
}

export interface userAnswerResponse {
  _id: string;
  ua: string;
  task: string;
  en: string;
  isDone: boolean;
}

export interface EditWordArgs {
  id: string;
  userWord: UserWord;
}
