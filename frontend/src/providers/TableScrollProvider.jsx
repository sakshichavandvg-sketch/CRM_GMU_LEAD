"use client";

import React, { createContext, useContext, useState } from "react";

const TableScrollContext = createContext({
  isScrolled: false,
  setScrolled: () => {},
});

export function TableScrollProvider({ children }) {
  const [isScrolled, setScrolled] = useState(false);

  return (
    <TableScrollContext.Provider value={{ isScrolled, setScrolled }}>
      {children}
    </TableScrollContext.Provider>
  );
}

export function useTableScroll() {
  return useContext(TableScrollContext);
}
