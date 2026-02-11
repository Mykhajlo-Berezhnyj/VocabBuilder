type getVisiblePagesProps = {
  current: number;
  totalPages: number;
  width: number;
};

type Page = number | "...";

export function getVisiblePages({
  current,
  totalPages,
  width,
}: getVisiblePagesProps): Page[] {
  let pages: Page[] = [];

  if (!totalPages || totalPages <= 0) return pages;

  if (totalPages < 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log("🚀 ~ getVisiblePages ~ pages:", pages);
    return pages;
  }

  if (width < 768) {
    pages.push(1);

    if (width >= 460) {
      if (current > 3) {
        pages.push("...");
      }

      if (current >= 3) {
        pages.push(current - 1);
      }

      if (current >= 2 && current !== totalPages) {
        pages.push(current);
      }

      if (current < totalPages - 1) {
        pages.push(current + 1);
      }

      if (current < totalPages - 2) {
        pages.push("...");
      }
    } else {
      if (current > 2) {
        pages.push("...");
      }
      if (current !== totalPages && current !==1) {
        pages.push(current);
      }

      if (current < totalPages - 1) {
        pages.push("...");
      }
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
