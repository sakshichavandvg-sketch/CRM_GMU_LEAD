import { useRef, useCallback } from "react";

export function useInfiniteScrollObserver({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) {
  const observerRef = useRef();

  const loadMoreRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return loadMoreRef;
}
