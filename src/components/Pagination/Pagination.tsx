import Button from "../Button/Button";
import Container from "../Container/Container";
import { getVisiblePages } from "../utils/getVisiblePages";
import clsx from "clsx";
import css from "./Pagination.module.css";
import Icon from "../Icon/Icon";
import useWindowWidth from "../hook/useWindowWidth";

type PaginationProps = {
  className?: string;
  page: number;
  totalPages: number;
  changePage: (page: number) => void;
};

export default function Pagination({
  className,
  page,
  totalPages,
  changePage,
}: PaginationProps) {
  const width = useWindowWidth();

  if (!totalPages || totalPages <= 1) return null;

  const pages = getVisiblePages({ current: page, totalPages: totalPages, width: width });

  return (
    <nav className={clsx(css.nav, className)}>
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
