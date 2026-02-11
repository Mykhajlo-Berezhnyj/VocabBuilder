import type { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";
import type { Option } from "./SelectCategory";

export const customSelectStyles = (
  isFilter: boolean,
): StylesConfig<Option, false, GroupBase<Option>> => ({
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: isFilter ? "var(--color-header)" : "var(--color-primary)",
    // border: "1 solid rgba(var(--rgb-color-font-primary), 0.1)",
    boxShadow: "none",
    height: 48,
    width: "100%",
    borderRadius: "var(--border-radius)",
    display: "flex",
    alignItems: "center",
    // "&:hover": { borderColor: "#555" },
  }),
  valueContainer: (base) => ({
    ...base,
    height: 48,
    // backgroundColor: "var(--background)",
    margin: 0,
    padding: "0 18px",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    borderRadius: 14,
  }),
  placeholder: (base, state) => ({
    ...base,
    margin: 0,
    color: (state.selectProps as { error?: boolean }).error
      ? "red"
      : "var(--font-main)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--font-main)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--background-header)",
    color: "var(--color-font-primary)",
    borderRadius: 15,
    padding: "0 18px",
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    // backgroundColor: state.isSelected
    //   ? "var(--background)"
    //   : state.isFocused
    //   ? "var(--background)"
    //   : "var(--background)",
    color: state.isSelected
      ? "var(--color-font-main)"
      : state.isFocused
        ? "var(--color-font-main)"
        : "var(--color-font-second)",
    "&:active": {
      color: "var(--color-font-main)",
    },
    // "&:hover": {
    //   color: "#101828",
    //   backgroundColor: "#F7F7F7",
    // },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: isFilter
      ? "var(--color-font-primary)"
      : "var(--color-font-secondary)",
    ":hover": {
      opacity: 0.5,
      // color: isFilter
      //   ? "var(--color-font-secondary)"
      //   : "var(--color-font-primary)",
    },
    padding: 13,
    cursor: "pointer",
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    size: 20,
  }),
  indicatorSeparator: () => ({
    display: "block",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: isFilter
      ? "var(--color-font-primary)"
      : "var(--color-font-secondary)",
    padding: 8,
    cursor: "pointer",
    transition: "all 0.3s ease, color 0.3s ease",
    ":hover": { color: "red", transform: "rotate(180deg)" },
  }),
});
