import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";
import { changePage, changePerPage } from "../../redux/dictionary/slice";
import {
  changePage as changePageUser,
  changePerPage as changePerPageUser,
} from "../../redux/userDictionary/slice";
import {
  setCategories,
  setIsIrregular,
  setSearch,
} from "../../redux/filters/slice";
import type { Category, CategoryNotVerb, Filter } from "../../redux/filters/types";
import { buildUrlFromParams } from "../utils/buildUrlFromParams";
import { useEffect } from "react";
import { fetchUserWords } from "../../redux/userDictionary/operations";
import { fetchWords } from "../../redux/dictionary/operations";

export function useInitFromUrl() {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const { page, limit, keyword, category, isIrregular } =
      buildUrlFromParams(params);

    if (pathname.includes("dictionary") || pathname.includes("recommend")) {
      dispatch(setSearch(keyword));

      dispatch(setCategories(category as Category));
      if (category === "verb" && isIrregular) {
        dispatch(setIsIrregular(isIrregular));
      }
    }
    let filters: Filter = { keyword: "", category: null, };
    
    if (category === "verb") {
       filters = {
        keyword: keyword,
        category: "verb",
        isIrregular: isIrregular,
      };
    } else if (category as Category !== "verb") {
         filters = {
            keyword: keyword,
            category: category as CategoryNotVerb,
        }
    }

    if (pathname.includes("/dictionary")) {
      dispatch(changePageUser(page));
      dispatch(changePerPageUser(limit));
      dispatch(
        fetchUserWords({
          page,
          perPage: limit,
          filters,
        }),
      );
    } else if (pathname.includes("/recommend")) {
      dispatch(changePage(page));
      dispatch(changePerPage(limit));
      dispatch(
        fetchWords({
          page,
          perPage: limit,
          filters,
        }),
      );
    }
  }, [pathname, dispatch, searchParams]);
}
