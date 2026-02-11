import type { CategoryNotVerb } from "../../redux/filters/types";

export type BaseWordFormData = {
  en: string;
  ua: string;
};

export type EditFormData = BaseWordFormData;

type AddFormDataNotVerb = BaseWordFormData & {
  category: CategoryNotVerb;
};

type AddFormDataVerb = BaseWordFormData & {
  category: "verb";
  isIrregular: boolean;
};

export type AddFormData = AddFormDataNotVerb | AddFormDataVerb;
