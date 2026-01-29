import { useCallback, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./DictionaryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchUserWords } from "../../redux/userDictionary/operations";
import { selectSelectedFilters } from "../../redux/filters/selectors";
import WordsTable from "../../components/WordsTable/WordsTable";
import Pagination from "../../components/Pagination/Pagination";
import {
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectWords,
} from "../../redux/userDictionary/selectors";
import { changePage } from "../../redux/userDictionary/slice";
import { useDictionaryColumns } from "../../components/WordsTable/table/useColumns";
import { selectIsOpen } from "../../redux/modal/selector";
import { openModal } from "../../redux/modal/slice";
import type { UserWordResponse } from "../../redux/userDictionary/types";

export default function DictionaryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectSelectedFilters);
  const words = useSelector(selectWords);
  const isOpen = useSelector(selectIsOpen);

  const handleEdit = useCallback((editingWord: UserWordResponse) => {
    if (isOpen) return;
    dispatch(openModal({ type: "editWord", payload: editingWord }));
  },[dispatch, isOpen]);

  const columns = useDictionaryColumns(handleEdit);

  useEffect(() => {
    dispatch(fetchUserWords({ page, perPage, filters }));
  }, [page, perPage, filters, dispatch]);

  return (
    <main>
      <Dashboard className={css.sectionDashboard} />
      <WordsTable data={words} className={css.sectionTable} columns={columns} />
      <Pagination
        page={page}
        totalPages={totalPages}
        changePage={(newPage) => dispatch(changePage(newPage))}
      />
    </main>
  );
}
