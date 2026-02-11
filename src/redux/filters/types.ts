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

export type BaseFilter = {
  keyword: string;
};

export type CategoryNotVerb = Exclude<Category, "verb">;

export type VerbFilter = BaseFilter & {
  category: "verb";
  isIrregular: boolean;
};

export type NonVerbFilter = BaseFilter & {
  category: CategoryNotVerb | null;
  isIrregular?: never;
};

export type Filter = VerbFilter | NonVerbFilter;

export interface FiltersState {
  categories: Category[];
  selectedFilters: Filter;
  isLoading: boolean;
  error: string | null;
}

export type Option = { label: Category; value: Category };
