import { useState, useEffect } from "react";
import SearchBar from "@/components/management/SearchBar";

export default function SearchSection({ initialSearch, onSearch }) {
  const [localSearch, setLocalSearch] = useState(initialSearch || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== initialSearch) {
        onSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, initialSearch, onSearch]);

  return (
    <div className="flex-1 max-w-md">
      <SearchBar
        value={localSearch}
        onChange={setLocalSearch}
        placeholder="Search leads..."
      />
    </div>
  );
}
