import type { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";
import type { Option } from "./SelectCategory";

export const customSelectStyles = (
  isFilter: boolean,
): StylesConfig<Option, false, GroupBase<Option>> => ({
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: isFilter
      ? "rgba(var(--rgb-color-font-primary), 0.1)"
      : "rgba(var(--rgb-color-font-secondery), 0.3)",
    boxShadow: "none",
    height: 48,
    width: "100%",
    borderRadius: "var(--border-radius)",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus-visible": {
      borderColor: isFilter
        ? "var(--color-primary)"
        : "var(--color-font-secondary)",
    },
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
    backgroundColor: state.isSelected
      ? "transparent"
      : state.isFocused
        ? "transparent"
        : "transparent",
    color: state.isSelected
      ? isFilter
        ? "rgba(var(--rgb-color-font-primary), 0.5)"
        : "rgba(var(--color-primary-rgb), 0.8)"
      : state.isFocused
        ? "var(--color-primary)"
        : isFilter
          ? "var(--color-font-primary)"
          : "rgba(var(--rgb-color-font-primary), 0.8)",
    "&:active": {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-font-secondary)",
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
    },
    paddingInline: 8,
    marginRight: 16,
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
    color: "red",
    padding: 3,
    marginRight: -51,
    cursor: "pointer",
    opacity: 0.5,
    transition: "all 0.3s ease",
    ":hover": { opacity: 1, transform: "rotate(180deg)" },
  }),
});
