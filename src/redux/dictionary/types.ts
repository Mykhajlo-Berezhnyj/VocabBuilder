import type { RejectError } from "../../components/utils/getErrorMessage";
import type { CategoryNotVerb } from "../filters/types";

export interface DictionaryState {
  words: Word[];
  totalPages: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  error: RejectError | null;
}
type WordVerb = {
  _id: string;
  en: string;
  ua: string;
  category: "verb";
  isIrregular: boolean;
};

type WordNotVerb = {
  _id: string;
  en: string;
  ua: string;
  category: CategoryNotVerb;
};

export type Word = WordVerb | WordNotVerb;

export interface ApiFilterResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}
