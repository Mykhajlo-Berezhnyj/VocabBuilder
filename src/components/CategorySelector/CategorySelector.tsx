import SelectCategory, { type Option } from "./SelectCategory/SelectCategory";
import VerbTypeRadio from "./VerbTypeRadio/VerbTypeRadio";
import css from "./CategorySelector.module.css";
import type { SingleValue } from "react-select";
import type { Category } from "../../redux/filters/types";
import clsx from "clsx";

type CategorySelectorBaseProps = {
  mode: "form" | "filter";
  className: string;
  options: Option[];
  value: SingleValue<Option> | null;
  onChange: (option: SingleValue<Option>) => void;
};

type VerbProps = {
  category: "verb";
  isIrregular: boolean;
  onChangeIsIrregular: (value: boolean) => void;
};

type NonVerbProps = {
  category: Exclude<Category, "verb"> | null;
  isIrregular?: never;
  onChangeIsIrregular?: never;
};

export type CategorySelectorProps =
  | (CategorySelectorBaseProps & VerbProps)
  | (CategorySelectorBaseProps & NonVerbProps);

export default function CategorySelector(props: CategorySelectorProps) {
  const { className, mode, options, value, category, onChange } = props;

  return (
    <div className={clsx(css.selectWrap, className)}>
      <SelectCategory
        className={css.select}
        options={options}
        value={value}
        onChange={onChange}
      />
      {category === "verb" && (
        <VerbTypeRadio
          className={css.radioGroup}
          mode={mode}
          isIrregular={props.isIrregular}
          onChange={props.onChangeIsIrregular}
        />
      )}
    </div>
  );
}
