import { useState, useEffect, useMemo } from "react";

export function useFollowupWorkspace(rawFollowups = []) {
  // 1. UI State
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'calendar'
  const [activeTab, setActiveTab] = useState("today"); // 'today' | 'upcoming' | 'overdue' | 'completed' | 'all'
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Date Presets & Custom Range
  const [datePreset, setDatePreset] = useState("all"); // 'today' | 'tomorrow' | 'this_week' | 'next_week' | 'this_month' | 'custom' | 'all'
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  
  // Advanced Filters
  const [filters, setFilters] = useState({
    priority: "",
    course: "",
    status: "",
    source: "",
    assignedCounselor: "",
    date: "",
  });

  // Calendar State
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  // 2. Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  // 3. Derived Filtering Pipeline
  const filteredFollowups = useMemo(() => {
    let result = [...rawFollowups];

    // A. Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(f => 
        (f.student || f.leadName || "").toLowerCase().includes(q) ||
        (f.phone || f.mobile || "").includes(q) ||
        (f.course || "").toLowerCase().includes(q) ||
        (f.enquiryNo || "").toLowerCase().includes(q)
      );
    }

    // Helper to get YYYY-MM-DD safely in local time
    const getLocalYYYYMMDD = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const todayStr = getLocalYYYYMMDD(today);

    // B. Date Preset (Applies to all tabs if a preset is selected)
    if (datePreset !== "all") {
      result = result.filter(f => {
        const rawDateStr = f.scheduledDate || f.date || f.createdAt;
        if (!rawDateStr) return false;
        
        const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;

        if (datePreset === "today") {
          return fDateStr === todayStr;
        }
        if (datePreset === "tomorrow") {
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          return fDateStr === getLocalYYYYMMDD(tomorrow);
        }
        if (datePreset === "this_week") {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return fDateStr >= getLocalYYYYMMDD(startOfWeek) && fDateStr <= getLocalYYYYMMDD(endOfWeek);
        }
        if (datePreset === "next_week") {
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() - today.getDay() + 7);
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
          return fDateStr >= getLocalYYYYMMDD(nextWeekStart) && fDateStr <= getLocalYYYYMMDD(nextWeekEnd);
        }
        if (datePreset === "this_month") {
          const fYear = fDateStr.substring(0, 4);
          const fMonth = fDateStr.substring(5, 7);
          const tYear = String(today.getFullYear());
          const tMonth = String(today.getMonth() + 1).padStart(2, '0');
          return fYear === tYear && fMonth === tMonth;
        }
        if (datePreset === "custom" && dateRange.from && dateRange.to) {
          return fDateStr >= dateRange.from && fDateStr <= dateRange.to;
        }
        return true;
      });
    }

    // C. Advanced Filters
    if (filters.priority) result = result.filter(f => f.priority === filters.priority);
    if (filters.course) result = result.filter(f => f.course === filters.course);
    if (filters.status) result = result.filter(f => (f.leadStatus || f.status || f.stage) === filters.status);
    if (filters.source) result = result.filter(f => f.source === filters.source);
    if (filters.assignedCounselor) result = result.filter(f => f.assignedCounselor === filters.assignedCounselor);
    if (filters.date) {
      result = result.filter(f => {
        const rawDateStr = f.scheduledDate || f.date || f.createdAt;
        if (!rawDateStr) return false;
        const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;
        return fDateStr === filters.date;
      });
    }

    // D. Sorting
    result.sort((a, b) => {
      const dateAStr = `${a.scheduledDate || a.date || "9999-12-31"}T${a.scheduledTime || a.time || "00:00"}`;
      const dateBStr = `${b.scheduledDate || b.date || "9999-12-31"}T${b.scheduledTime || b.time || "00:00"}`;
      
      if (activeTab === "overdue") {
        return dateAStr.localeCompare(dateBStr); 
      }
      if (activeTab === "completed") {
        return dateBStr.localeCompare(dateAStr);
      }
      return dateAStr.localeCompare(dateBStr);
    });

    return result;
  }, [rawFollowups, debouncedSearch, datePreset, dateRange, filters, activeTab]);

  // 4. Summaries & Tab Distributions
  const { summaryCards, tabCounts, workSummary } = useMemo(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    let tCount = 0;
    let oCount = 0;
    let uCount = 0;
    let cCount = 0;

    let totalPending = 0;

    filteredFollowups.forEach(f => {
      const rawDateStr = f.scheduledDate || f.date || f.createdAt;
      if (!rawDateStr) return;
      const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;

      const isCompleted = f.status === "Completed" || f.leadStatus === "Completed" || f.stage === "Completed";
      
      if (isCompleted) {
        cCount++;
      } else {
        totalPending++;
        if (fDateStr < todayStr) oCount++;
        else if (fDateStr === todayStr) tCount++;
        else if (fDateStr > todayStr) uCount++;
      }
    });

    return {
      tabCounts: {
        all: filteredFollowups.length,
        today: tCount,
        upcoming: uCount,
        overdue: oCount,
        completed: cCount,
      },
      summaryCards: { today: tCount, upcoming: uCount, overdue: oCount, completed: cCount },
      workSummary: { total: filteredFollowups.length, completed: cCount, pending: totalPending, overdue: oCount }
    };
  }, [filteredFollowups]);

  // 5. Final Tab Filter
  const displayFollowups = useMemo(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    if (viewMode === "calendar" && selectedCalendarDay) {
      return filteredFollowups.filter(f => {
        const rawDateStr = f.scheduledDate || f.date || f.createdAt;
        if (!rawDateStr) return false;
        const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;
        return fDateStr === selectedCalendarDay;
      });
    }

    if (activeTab === "all") return filteredFollowups;

    return filteredFollowups.filter(f => {
      const rawDateStr = f.scheduledDate || f.date || f.createdAt;
      if (!rawDateStr) return false;
      const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;

      const isCompleted = f.status === "Completed" || f.leadStatus === "Completed" || f.stage === "Completed";

      switch (activeTab) {
        case "today": return fDateStr === todayStr && !isCompleted;
        case "upcoming": return fDateStr > todayStr && !isCompleted;
        case "overdue": return fDateStr < todayStr && !isCompleted;
        case "completed": return isCompleted;
        default: return true;
      }
    });
  }, [filteredFollowups, activeTab, viewMode, selectedCalendarDay]);
  // Workspace Diagnostics
  useEffect(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const debugToday = filteredFollowups.filter(f => {
      const rawDateStr = f.scheduledDate || f.date || f.createdAt;
      if (!rawDateStr) return false;
      const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;
      const isCompleted = f.status === "Completed" || f.leadStatus === "Completed" || f.stage === "Completed";
      return fDateStr === todayStr && !isCompleted;
    });

    const debugUpcoming = filteredFollowups.filter(f => {
      const rawDateStr = f.scheduledDate || f.date || f.createdAt;
      if (!rawDateStr) return false;
      const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;
      const isCompleted = f.status === "Completed" || f.leadStatus === "Completed" || f.stage === "Completed";
      return fDateStr > todayStr && !isCompleted;
    });

    console.log("========== WORKSPACE READ DIAGNOSTICS ==========");
    console.log("1. rawFollowups:", rawFollowups);
    console.log("2. mapped filteredFollowups:", filteredFollowups);
    console.log("3. filteredToday:", debugToday);
    console.log("4. filteredUpcoming:", debugUpcoming);
    console.log("================================================");
  }, [rawFollowups, filteredFollowups]);

  return {
    viewMode, setViewMode,
    activeTab, setActiveTab,
    searchText, setSearchText,
    datePreset, setDatePreset,
    dateRange, setDateRange,
    filters, setFilters,
    selectedCalendarDay, setSelectedCalendarDay,
    
    filteredFollowups,
    displayFollowups,
    tabCounts,
    summaryCards,
    workSummary,
  };
}
