import { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import css from "./RecommendPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectSelectedFilters } from "../../redux/filters/selectors";
import {
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectWords,
} from "../../redux/dictionary/selectors";
import { fetchWords } from "../../redux/dictionary/operations";
import WordsTable from "../../components/WordsTable/WordsTable";
import Pagination from "../../components/Pagination/Pagination";
import { changePage } from "../../redux/dictionary/slice";

export default function RecommendPage() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectSelectedFilters);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const perPage = useSelector(selectPerPage);
  const words = useSelector(selectWords);

  useEffect(() => {
    // if (filters.category === "verb" && filters.isIrregular === null) return;
    dispatch(fetchWords({ page, perPage, filters }));
    console.log("🚀 ~ Pagination ~ page:", page);
  }, [page, perPage, filters, dispatch]);

  return (
    <main>
      <Dashboard className={css.dashboard} />
      <WordsTable data={words} />
      <Pagination
        className={css.pagination}
        page={page}
        totalPages={totalPages}
        changePage={(newPage) => dispatch(changePage(newPage))}
      />
    </main>
  );
}
