import { create } from "zustand";

const useGlobalSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useGlobalSearchStore;
