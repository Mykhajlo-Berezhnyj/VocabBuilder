import type { ColumnDef } from "@tanstack/react-table";
import css from "./useDictionaryColumns.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CircularCell } from "../CircularCell/CircularCell";
import ActionsBtn from "../../../Button/ActionsBtn/ActionsBtn";
import { useMemo } from "react";
import type { UserWordResponse } from "../../../../redux/userDictionary/types";
import LanguageTitle from "../LanguageTitle/LanguageTitle";

export function baseColumns(css: CSSModuleClasses) {
  return [
    {
      accessorKey: "en",
      id: "en",
      header: <LanguageTitle title="Word" iconName={"icon-uk"} />,
      meta: { className: css.en },
    },
    {
      accessorKey: "ua",
      id: "ua",
      header: <LanguageTitle title="Translation" iconName={"icon-ua"} />,
      meta: { className: css.ua },
    },
  ];
}

export function useDictionaryColumns(
  handleClick: (editingWord: UserWordResponse) => void,
) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const base = baseColumns(css);

  return useMemo<ColumnDef<UserWordResponse>[]>(
    () => [
      ...base,
      ...(isMobile
        ? []
        : [
            {
              accessorKey: "category",
              id: "category",
              header: "Category",
              meta: { className: css.category },
            },
          ]),
      {
        accessorKey: "progress",
        id: "progress",
        header: "Progress",
        meta: { className: css.progress },
        cell: ({ row }) => {
          const value = row.getValue("progress") as number;
          return <CircularCell value={value} isMobile={isMobile} />;
        },
      },
      {
        id: "actions",
        header: " ",
        meta: { className: css.actions },
        cell: ({ row }) => {
          const editingWord = row.original;
          return <ActionsBtn editingWord={editingWord} onEdit={handleClick} />;
        },
      },
    ],
    [isMobile, handleClick],
  );
}
