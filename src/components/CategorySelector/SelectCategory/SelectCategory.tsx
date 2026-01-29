import Select, { type SingleValue } from "react-select";
import { customSelectStyles } from "./selectStyles";
import type { Category } from "../../../redux/filters/types";

export type Option = { label: Category; value: Category };

type SelectCategoryProps = {
  className: string;
  value: SingleValue<Option> | null;
  options: Option[];
  onChange: (option: SingleValue<Option>) => void;
};

export default function SelectCategory({
  className,
  options,
  value,
  onChange,
}: SelectCategoryProps) {
  return (
    <Select
      className={className}
      options={options}
      styles={customSelectStyles}
      value={value}
      onChange={onChange}
      placeholder="Categories"
      isClearable={true}
      isSearchable={true}
    />
  );
}
