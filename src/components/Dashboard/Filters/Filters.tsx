import { useSelector } from "react-redux";
import {
  selectOptions,
  selectSelectedFilters,
} from "../../../redux/filters/selectors";
import { useEffect, useState } from "react";
import useDebouncedValue from "../../utils/useDebouncedValue";
import css from "./Filters.module.css";
import Icon from "../../Icon/Icon";
import CategorySelector from "../../CategorySelector/CategorySelector";
import type { Option } from "../../CategorySelector/SelectCategory/SelectCategory";
import { useSearchParams } from "react-router-dom";

type FiltersProps = {
  className: string;
};

export default function Filters({ className }: FiltersProps) {
  const [inputVale, setInputValue] = useState("");
  const options = useSelector(selectOptions);
  const { category, isIrregular } = useSelector(selectSelectedFilters);
  const [searchParams, setSearchParams] = useSearchParams();
 
  const debouncedKeyword = useDebouncedValue(inputVale, 300);
  const satinizedKeyword = debouncedKeyword.trim();

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") ?? "";
    if (satinizedKeyword === currentKeyword) return;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (satinizedKeyword) {
        newParams.set("keyword", satinizedKeyword);
      } else {
        newParams.delete("keyword");
      }
      newParams.set("page", "1");
      return newParams;
    });
  }, [satinizedKeyword, searchParams, setSearchParams]);

  const handleChangeCategory = (opt: Option | null) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (opt?.value) {
        newParams.set("category", opt.value);
      } else {
        newParams.delete("category");
        newParams.delete("isIrregular");
      }
      newParams.set("page", "1");
      return newParams;
    });
  };

  const handleChangeIsIrregular = (val: boolean) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (val) {
        newParams.set("isIrregular", String(val));
      } else {
        newParams.delete("isIrregular");
      }
      newParams.set("page", "1");
      return newParams;
    });
  };

  const selectorProps =
    category === "verb"
      ? {
          className: css.selectWrap,
          mode: "filter" as const,
          options,
          category: "verb" as const,
          value: options.find((opt) => opt.value === category) || null,
          onChange: handleChangeCategory,
          isIrregular: !!isIrregular,
          onChangeIsIrregular: handleChangeIsIrregular,
        }
      : {
          className: css.selectWrap,
          mode: "filter" as const,
          options,
          category,
          value: options.find((opt) => opt.value === category) || null,
          onChange: handleChangeCategory,
        };
  return (
    <form className={className}>
      <div className={css.inputWrap}>
        <input
          type="text"
          name="keyword"
          aria-label="Find the word"
          title="Find the word"
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
