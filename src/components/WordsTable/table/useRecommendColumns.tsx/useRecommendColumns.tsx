import css from "./useRecommendColumns.module.css";
import AddWordBtn from "../../../Button/AddWordBtn/AddWordBtn";
import { useBaseColumns } from "../useDictionaryColumns/useDictionaryColumns";
import { useMemo } from "react";
import type { CellContext } from "@tanstack/react-table";
import type { Word } from "../../../../redux/dictionary/types";

export function useRecommendColumns(handleClick: (id: Word["_id"]) => void) {
  const base = useBaseColumns<Word>(css);

  return useMemo(
    () => [
      ...base,
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
          cell: ({ row }: CellContext<Word, unknown>) => {
            const { _id } = row.original;
            return <AddWordBtn onClick={() => handleClick(_id)} />;
          },
        },
      ],
    ],
    [base, handleClick],
  );
}
