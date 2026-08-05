import { useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useGlobalSearchStore from "@/store/globalSearchStore";

export const useLeadOverviewFilters = (initialType = "") => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { searchQuery } = useGlobalSearchStore();

  // URL Params parsing
  const page = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const sort = searchParams.get("sort") || "";
  const type = searchParams.get("type") ?? initialType;
  const search = searchParams.get("search") || "";
  const source = searchParams.get("source") || "";
  const status = searchParams.get("status") || "";
  const callerName = searchParams.get("callerName") || "";
  const course = searchParams.get("course") || "";
  const opinion = searchParams.get("opinion") || "";
  const state = searchParams.get("state") || "";
  const district = searchParams.get("district") || "";
  const taluk = searchParams.get("taluk") || "";

  const isInitialMount = useRef(true);

  const updateUrl = useCallback((updates, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (resetPage && updates.page === undefined) {
      params.set("page", "0");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  // Debounce Global Search to URL
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      if (searchQuery !== search) {
        updateUrl({ search: searchQuery }, true);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery, search, updateUrl]);

  const filters = {
    page, size, sort, type, search,
    source, status, callerName, course, opinion, state, district, taluk,
  };

  const actions = {
    setFilters: (updates) => updateUrl(updates, true),
    setPage: (v) => updateUrl({ page: v }, false), // Changing page doesn't reset page
    setSize: (v) => updateUrl({ size: v }, true),
    setSort: (v) => updateUrl({ sort: v }, true),
    setType: (v) => updateUrl({ type: v }, true),
    setSource: (v) => updateUrl({ source: v }, true),
    setStatus: (v) => updateUrl({ status: v }, true),
    setCallerName: (v) => updateUrl({ callerName: v }, true),
    setCourse: (v) => updateUrl({ course: v }, true),
    setOpinion: (v) => updateUrl({ opinion: v }, true),
    setState: (v) => updateUrl({ state: v }, true),
    setDistrict: (v) => updateUrl({ district: v }, true),
    setTaluk: (v) => updateUrl({ taluk: v }, true),
  };

  return { search: searchQuery, filters, actions };
};
