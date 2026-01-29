import type { ColumnDef } from "@tanstack/react-table";
import css from "./useColumns.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CircularCell } from "./CircularCell/CircularCell";
import ActionsBtn from "../../Button/ActionsBtn/ActionsBtn";
import { useMemo } from "react";
import AddWordBtn from "../../Button/AddWordBtn/AddWordBtn";
import type { UserWordResponse } from "../../../redux/userDictionary/types";

const baseColumns: ColumnDef<UserWordResponse>[] = [
  { accessorKey: "en", id: "en", header: "Word", meta: { className: css.en } },
  {
    accessorKey: "ua",
    id: "ua",
    header: "Translation",
    meta: { className: css.ua },
  },
];

export function useDictionaryColumns(onEdit: (editingWord:UserWordResponse)=>void) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return useMemo<ColumnDef<UserWordResponse>[]>(
    () => [
      ...baseColumns, 
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
          return (
            <ActionsBtn
              editingWord={editingWord}
              onEdit={onEdit}
            />
          );
        },
      },
    ],
    [isMobile, onEdit],
  );
}

export function useRecommendColumns() {
  return [
    ...baseColumns,
    ...[
      {
        accessorKey: "category",
        id: "category",
        header: "Category",
        meta: { className: css.category },
      },
      {
        header: "",
        id: "addWord",
        meta: { className: css.addWord },
        cell: ({ row }) => {
          const { _id } = row.original;
          return <AddWordBtn id={_id} />;
        },
      },
    ],
  ];
}
