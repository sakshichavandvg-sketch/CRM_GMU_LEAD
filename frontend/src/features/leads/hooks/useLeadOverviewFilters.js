import { useState, useEffect } from "react";
import useGlobalSearchStore from "@/store/globalSearchStore";

export const useLeadOverviewFilters = (initialType = "hot") => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [type, setType] = useState(initialType);
  const { searchQuery } = useGlobalSearchStore();
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Detailed filters
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [callerName, setCallerName] = useState("");
  const [course, setCourse] = useState("");
  const [opinion, setOpinion] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(0); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset page when other filters change
  useEffect(() => {
    setPage(0);
  }, [type, source, status, callerName, course, opinion, state, district, taluk, size]);

  const filters = {
    page,
    size,
    type,
    search: debouncedSearch,
    source,
    status,
    callerName,
    course,
    opinion,
    state,
    district,
    taluk,
  };

  const actions = {
    setPage,
    setSize,
    setType,
    setSource,
    setStatus,
    setCallerName,
    setCourse,
    setOpinion,
    setState,
    setDistrict,
    setTaluk,
  };

  return { search: searchQuery, filters, actions };
};
