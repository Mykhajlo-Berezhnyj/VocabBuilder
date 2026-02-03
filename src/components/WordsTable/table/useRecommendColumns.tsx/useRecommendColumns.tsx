import css from "./useRecommendColumns.module.css";
import AddWordBtn from "../../../Button/AddWordBtn/AddWordBtn";
import { baseColumns } from "../useDictionaryColumns/useDictionaryColumns";
import type { UserWordResponse } from "../../../../redux/userDictionary/types";
import toast from "react-hot-toast";

export function useRecommendColumns(
  handleClick: (id: UserWordResponse["_id"]) => void,
) {
  const base = baseColumns(css);

  return [
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
        cell: ({ row }) => {
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
  ];
}
