import { useState } from "react";

export function usePagination(total: number, pageSize: 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / pageSize);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return { page, totalPages, goToPage, nextPage, prevPage, pageSize };
}
