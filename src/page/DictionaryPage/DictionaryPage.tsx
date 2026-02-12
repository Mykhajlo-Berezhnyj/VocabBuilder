import { useCallback, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./DictionaryPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  deleteWord,
  fetchUserWords,
} from "../../redux/userDictionary/operations";
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
import { useDictionaryColumns } from "../../components/WordsTable/table/useDictionaryColumns/useDictionaryColumns";
import { selectIsOpen } from "../../redux/modal/selector";
import { openModal } from "../../redux/modal/slice";
import type { UserWordResponse } from "../../redux/userDictionary/types";
import toast from "react-hot-toast";
import {
  selectError,
  selectIsLoading,
} from "../../redux/userDictionary/selectors";
import Loader from "../../components/Loader/Loader";

export default function DictionaryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectSelectedFilters);
  const words = useSelector(selectWords);
  const isOpen = useSelector(selectIsOpen);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleClick = useCallback(
    (editingWord: UserWordResponse) => {
      if (isOpen) return;
      dispatch(openModal({ type: "editWord", payload: editingWord }));
    },
    [dispatch, isOpen],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const res = await dispatch(deleteWord(id)).unwrap();
      const isLastWordOnPage = words.length === 1 && page > 1;

      toast.success(res.message);

      if (isLastWordOnPage) {
        dispatch(changePage(page - 1));
      } else {
        dispatch(fetchUserWords({ page, perPage, filters }));
      }
    },
    [dispatch, words.length, page, perPage, filters],
  );

  const columns = useDictionaryColumns(handleClick, handleDelete);

  useEffect(() => {
    dispatch(changePage(1));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchUserWords({ page, perPage, filters }));
  }, [page, perPage, filters, dispatch]);

  return (
    <>
      <Dashboard className={css.sectionDashboard} />
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <WordsTable<UserWordResponse>
            data={words}
            className={css.dictionaryTable}
            columns={columns}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            changePage={(newPage) => dispatch(changePage(newPage))}
          />
        </>
      )}
    </>
  );
}
