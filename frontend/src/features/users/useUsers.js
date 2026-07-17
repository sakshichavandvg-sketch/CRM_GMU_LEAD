"use client";

import { useQuery } from "@tanstack/react-query";

import usersService from "./usersService";

export default function useUsers({
  page = 0,
  size = 10,
  search = "",
  status = "",
}) {
  return useQuery({
    queryKey: ["users", page, size, search, status],

    queryFn: () =>
      usersService.getUsers({
        page,
        size,
        search,
        status,
      }),
  });
}