import Button from "../Button/Button";
import Container from "../Container/Container";
import { getVisiblePages } from "../utils/getVisiblePages";
import clsx from "clsx";
import css from "./Pagination.module.css";
import Icon from "../Icon/Icon";
import useWindowWidth from "../hook/useWindowWidth";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type PaginationProps = {
  className?: string;
  page: number;
  totalPages: number;
};

export default function Pagination({
  className,
  page,
  totalPages,
}: PaginationProps) {
  const width = useWindowWidth();

  const [, setSearchParams] = useSearchParams();

  const pages = getVisiblePages({
    current: page,
    totalPages: totalPages,
    width: width,
  });

  const changePage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(page));
        return params;
      });
    },
    [setSearchParams],
  );

  if (!totalPages || totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className={clsx(css.nav, className)}>
      <Container className={css.containerPagination}>
        <Button
          className={css.btnNav}
          disabled={page === 1}
          onClick={() => changePage(1)}
        >
          <Icon iconName="first" className={css.icon} />
        </Button>
        <Button
          className={css.btnNav}
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        >
          <Icon iconName="prev" className={css.icon} />
        </Button>
        {pages.map((num, index) =>
          num === "..." ? (
            <span key={`dot-${index}`} className={css.dots}>
              ...
            </span>
          ) : (
            <Button
              id="num"
              className={clsx(css.btnNav, { [css.active]: num === page })}
              onClick={() => changePage(num)}
            >
              {num}
            </Button>
          ),
        )}
        <Button
          className={css.btnNav}
          onClick={() => changePage(page + 1)}
          disabled={page === totalPages}
        >
          <Icon iconName="next" className={css.icon} />
        </Button>
        <Button
          className={css.btnNav}
          onClick={() => changePage(totalPages)}
          disabled={page === totalPages}
        >
          <Icon iconName="last" className={css.icon} />
        </Button>
      </Container>
    </nav>
  );
}
