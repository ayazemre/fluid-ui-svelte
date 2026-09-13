export type PaginationRangeOptions = {
  boundaryCount?: number;
  currentPage: number;
  siblingCount?: number;
  totalPages: number;
};

export type PaginationItem = { key: string; page: number; type: "page" } | { key: string; type: "ellipsis" };

/**
 * Computes an accessible pagination item list containing page numbers and ellipsis tokens.
 */
export function calculatePaginationRange(options: PaginationRangeOptions): PaginationItem[] {
  const { boundaryCount = 1, currentPage, siblingCount = 1, totalPages } = options;

  if (totalPages <= 0) {
    return [];
  }

  // Total visible numbers = boundaryCount * 2 + siblingCount * 2 + 1 (current) + 2 (two ellipsis)
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => ({
      key: `page-${index + 1}`,
      page: index + 1,
      type: "page" as const,
    }));
  }

  const startPages = Array.from({ length: boundaryCount }, (_, index) => index + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, index) => totalPages - boundaryCount + 1 + index);

  const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

  const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

  const items: PaginationItem[] = [];

  // Add boundary start pages
  for (const page of startPages) {
    items.push({ key: `page-${page}`, page, type: "page" });
  }

  // Add left ellipsis or intermediate numbers
  if (shouldShowLeftEllipsis) {
    items.push({ key: "ellipsis-left", type: "ellipsis" });
  } else {
    for (let page = boundaryCount + 1; page < leftSiblingIndex; page++) {
      items.push({ key: `page-${page}`, page, type: "page" });
    }
  }

  // Add middle sibling range (including current page)
  for (let page = leftSiblingIndex; page <= rightSiblingIndex; page++) {
    items.push({ key: `page-${page}`, page, type: "page" });
  }

  // Add right ellipsis or intermediate numbers
  if (shouldShowRightEllipsis) {
    items.push({ key: "ellipsis-right", type: "ellipsis" });
  } else {
    for (let page = rightSiblingIndex + 1; page <= totalPages - boundaryCount; page++) {
      items.push({ key: `page-${page}`, page, type: "page" });
    }
  }

  // Add boundary end pages
  for (const page of endPages) {
    items.push({ key: `page-${page}`, page, type: "page" });
  }

  return items;
}

export function isValidPageNavigation(targetPage: number, currentPage: number, totalPages: number): boolean {
  return targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage;
}
