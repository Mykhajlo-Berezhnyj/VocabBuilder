import { useDispatch, useSelector } from "react-redux";
import {
  selectOptions,
  selectSelectedFilters,
} from "../../../redux/filters/selectors";
import {
  setCategories,
  setIsIrregular,
  setSearch,
} from "../../../redux/filters/slice";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../../redux/store";
import useDebouncedValue from "../../utils/useDebouncedValue";
import css from "./Filters.module.css";
import Icon from "../../Icon/Icon";
import CategorySelector from "../../CategorySelector/CategorySelector";
import type { Option } from "../../CategorySelector/SelectCategory/SelectCategory";

type FiltersProps = {
  className: string;
};

export default function Filters({ className }: FiltersProps) {
  const [inputVale, setInputValue] = useState("");
  const options = useSelector(selectOptions);
  const { category, isIrregular } = useSelector(selectSelectedFilters);
  const dispatch = useDispatch<AppDispatch>();

  const debouncedKeyword = useDebouncedValue(inputVale, 300);
  const satinizedKeyword = debouncedKeyword.trim();

  useEffect(() => {
    dispatch(setSearch(satinizedKeyword));
  }, [satinizedKeyword, dispatch]);

  const selectorProps =
    category === "verb"
      ? {
          className: css.selectWrap,
          mode: "filter" as const,
          options,
          category: "verb" as const,
          value: options.find((opt) => opt.value === category) || null,
          onChange: (opt: Option | null) =>
            dispatch(setCategories(opt?.value ?? null)),
          isIrregular,
          onChangeIsIrregular: (val: boolean) => dispatch(setIsIrregular(val)),
        }
      : {
          className: css.selectWrap,
          mode: "filter" as const,
          options,
          category,
          value: options.find((opt) => opt.value === category) || null,
          onChange: (opt: Option | null) =>
            dispatch(setCategories(opt?.value ?? null)),
        };

  return (
    <form className={className}>
      <div className={css.inputWrap}>
        <input
          type="text"
          name="keyword"
          className={css.input}
          value={inputVale}
          placeholder="Find the word"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Icon iconName="search" className={css.iconSearch} />
      </div>
      <CategorySelector {...selectorProps} />
    </form>
  );
}
