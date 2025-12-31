import { boolean, string } from "yup";

export type Category =
  | "verb"
  | "participle"
  | "noun"
  | "adjective"
  | "pronoun"
  | "numerals"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "phrasal verb"
  | "functional phrase";

export interface FiltersState {
  category: Category[];
  isIrregular?: boolean;
  selectedFilters: {
    keyword: string;
    categories: Category | null;
  };
  isLoading: boolean;
  error: string | null;
}
