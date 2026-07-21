"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import usersService from "./usersService";

export default function useInfiniteUsers({
  size = 10,
  search = "",
  status = "",
}) {
  return useInfiniteQuery({
    queryKey: ["users", "infinite", size, search, status],
    queryFn: ({ pageParam = 0 }) =>
      usersService.getUsers({
        page: pageParam,
        size,
        search,
        status,
      }),
    getNextPageParam: (lastPage) => {
      // Assuming standard pageable response: { currentPage, totalPages, ... }
      // Or { page: { number, totalPages } }
      const currentPage = lastPage?.currentPage ?? lastPage?.page?.number ?? 0;
      const totalPages = lastPage?.totalPages ?? lastPage?.page?.totalPages ?? 1;

      if (currentPage + 1 < totalPages) {
        return currentPage + 1;
      }
      return undefined; // no more pages
    },
  });
}
