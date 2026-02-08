import css from "./useRecommendColumns.module.css";
import AddWordBtn from "../../../Button/AddWordBtn/AddWordBtn";
import { useBaseColumns } from "../useDictionaryColumns/useDictionaryColumns";
import type { UserWordResponse } from "../../../../redux/userDictionary/types";
import toast from "react-hot-toast";
import { useMemo } from "react";
import type { CellContext } from "@tanstack/react-table";

export function useRecommendColumns(
  handleClick: (id: UserWordResponse["_id"]) => void,
) {
  const base = useBaseColumns(css);

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
          cell: ({ row }: CellContext<UserWordResponse, unknown>) => {
            const { _id } = row.original;
            return (
              <AddWordBtn
                onClick={() => {
                  handleClick(_id);
                  toast.success("Word add to dictionary");
                }}
              />
            );
          },
        },
      ],
    ],
    [base, handleClick],
  );
}
