import React from "react";
import SearchSection from "./SearchSection";

export default function SearchActionsSection({ search, onSearch }) {
  return (
    <div className="w-full max-w-md">
      <SearchSection initialSearch={search} onSearch={onSearch} />
    </div>
  );
}
