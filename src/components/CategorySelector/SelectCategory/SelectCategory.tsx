import Select, { type SingleValue } from "react-select";
import { customSelectStyles } from "./selectStyles";
import type { Category } from "../../../redux/filters/types";

export type Option = { label: Category; value: Category };

type SelectCategoryProps = {
  className: string;
  value: SingleValue<Option> | null;
  options: Option[];
  onChange: (option: SingleValue<Option>) => void;
  mode: "form" | "filter"; 
};

export default function SelectCategory({
  className,
  options,
  value,
  mode= "filter",
  onChange,
}: SelectCategoryProps) {
  const isFilter = mode === "filter"
  console.log("🚀 ~ SelectCategory ~ isFilter:", isFilter)
  return (
    <Select
      className={className}
      options={options}
      styles={customSelectStyles(isFilter)}
      value={value}
      onChange={onChange}
      placeholder="Categories"
      isClearable={true}
      isSearchable={true}
    />
  );
}
