import { useRef, useState, useEffect } from "react";
import { Flame, Snowflake, Clock, UserCheck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

const getIconForFilter = (value) => {
  const v = value?.toLowerCase() || "";
  if (v.includes("hot")) return <Flame size={14} className="text-orange-500" />;
  if (v.includes("cold")) return <Snowflake size={14} className="text-blue-500" />;
  if (v.includes("pending") || v.includes("consulted")) return <Clock size={14} className="text-yellow-500" />;
  if (v.includes("allotted")) return <UserCheck size={14} className="text-emerald-500" />;
  if (v.includes("reassign")) return <RefreshCw size={14} className="text-purple-500" />;
  return null;
};

export default function QuickFilterBar({ filters, activeFilter, onSelect, counts = {}, isLoading, isError }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [filters, counts]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      setTimeout(checkScroll, 300); // Check after smooth scroll completes
    }
  };

  const renderBadge = (filter, isActive) => {
    const badgeKey = filter.value === "" ? "all" : filter.value;
    
    if (isLoading) {
      return <span className="w-6 h-4 bg-gray-200 rounded-md animate-pulse inline-block" />;
    }
    
    if (isError) {
      return (
        <span className={`
          text-xs px-1.5 py-0.5 rounded-md transition-colors
          ${isActive ? "bg-[#6F1D28]/10 text-[#6F1D28]" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
        `}>
          --
        </span>
      );
    }
    
    const count = counts[badgeKey];
    if (count !== undefined) {
      return (
        <span className={`
          text-xs px-1.5 py-0.5 rounded-md transition-colors
          ${isActive ? "bg-[#6F1D28]/10 text-[#6F1D28]" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
        `}>
          {count}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-1 w-full">
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`
          flex-shrink-0 z-10 p-1.5 rounded-full bg-white shadow-sm border border-gray-100
          text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200
          ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}
        `}
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex-1 overflow-x-auto scrollbar-hide py-2 gap-2 snap-x flex"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.value;
          const Icon = getIconForFilter(filter.value);
          
          return (
            <button
              key={filter.value}
              onClick={() => onSelect(filter.value)}
              className={`
                snap-start group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
                border whitespace-nowrap flex-shrink-0
                ${isActive 
                  ? "bg-[#6F1D28]/5 border-[#6F1D28]/30 text-[#6F1D28] ring-1 ring-[#6F1D28]/20" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
              {Icon}
              <span>{filter.label}</span>
              {renderBadge(filter, isActive)}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`
          flex-shrink-0 z-10 p-1.5 rounded-full bg-white shadow-sm border border-gray-100
          text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200
          ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}
        `}
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
