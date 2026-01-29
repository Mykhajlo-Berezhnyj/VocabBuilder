type getVisiblePagesProps = {
  current: number;
  totalPages: number;
};

type Page = number | "...";

export function getVisiblePages({
  current,
  totalPages,
}: getVisiblePagesProps): Page[] {
  const pages: Page[] = [];

  if (totalPages < 5)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const isNotMobile = window.matchMedia("(min-width: 768px)").matches;

  if (!isNotMobile) {
    pages.push(1, 2);

    if (current <= 3 || current === totalPages) {
      pages.push(3);
      pages.push("...");
    } else {
      pages.push("...");
      pages.push(current);
    }

    pages.push(totalPages);

    return pages;
  }
  pages.push(1, 2, 3);

  if (current > 5) {
    pages.push("...");
  }

  const createPage = (start: number, finish: number) => {
    for (let i = start; i <= finish; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
  };

  const startMidle = Math.max(4, current - 1);
  const finishMidle = Math.min(totalPages - 3, current + 1);

  createPage(startMidle, finishMidle);

  if (current < totalPages - 3) {
    pages.push("...");
  }

  createPage(totalPages - 2, totalPages);

  return pages;
}
