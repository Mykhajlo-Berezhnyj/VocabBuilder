import { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./RecommendPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectSelectedFilters } from "../../redux/filters/selectors";
import {
  selectError,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectWords,
} from "../../redux/dictionary/selectors";
import { fetchWords } from "../../redux/dictionary/operations";
import WordsTable from "../../components/WordsTable/WordsTable";
import Pagination from "../../components/Pagination/Pagination";
import { changePage } from "../../redux/dictionary/slice";
import { useRecommendColumns } from "../../components/WordsTable/table/useRecommendColumns.tsx/useRecommendColumns";
import { addUserWord } from "../../redux/userDictionary/operations";
import type { Word } from "../../redux/dictionary/types";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

export default function RecommendPage() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectSelectedFilters);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const perPage = useSelector(selectPerPage);
  const words = useSelector(selectWords);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleClick = async (id: Word["_id"]) => {
    await dispatch(addUserWord(id)).unwrap();
    toast.success("Word add to dictionary");
  };

  const columns = useRecommendColumns(handleClick);

  useEffect(() => {
    // if (filters.category === "verb" && filters.isIrregular === null) return;
    dispatch(fetchWords({ page, perPage, filters }));
    console.log("🚀 ~ Pagination ~ page:", page);
  }, [page, perPage, filters, dispatch]);

  return (
    <main>
      <Dashboard className={css.dashboard} />
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <WordsTable<Word>
            data={words}
            columns={columns}
            className={css.tableRecomend}
          />
          <Pagination
            className={css.pagination}
            page={page}
            totalPages={totalPages}
            changePage={(newPage) => dispatch(changePage(newPage))}
          />
        </>
      )}
    </main>
  );
}
