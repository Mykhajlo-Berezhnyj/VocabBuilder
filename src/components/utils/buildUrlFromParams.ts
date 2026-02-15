import type { Category } from "../../redux/filters/types";

export function buildUrlFromParams(params: URLSearchParams) {
  const page = Number(params.get("page") ?? 1);
  const limit = Number(params.get("limit") ?? 7);
  const keyword = params.get("keyword") ?? "";

  const validCategories = [
    "verb",
    "participle",
    "noun",
    "adjective",
    "pronoun",
    "numerals",
    "adverb",
    "preposition",
    "conjunction",
    "phrasal verb",
    "functional phrase",
  ];
  const categoryFromParams = params.get("category");
  const category =
    categoryFromParams && validCategories.includes(categoryFromParams)
      ? (categoryFromParams as Category)
      : null;

  const isIrregular = params.has("isIrregular")
    ? params.get("isIrregular") === "true"
    : null;

  return { page, limit, keyword, category, isIrregular };
}
