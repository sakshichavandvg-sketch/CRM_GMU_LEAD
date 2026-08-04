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
        (f.name || "").toLowerCase().includes(q) ||
        (f.phone || "").includes(q) ||
        (f.course || "").toLowerCase().includes(q) ||
        (String(f.enquiryNo) || "").toLowerCase().includes(q)
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
        const rawDateStr = f.scheduledDate || f.createdAt;
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
    if (filters.status) result = result.filter(f => f.status === filters.status);
    if (filters.source) result = result.filter(f => f.source === filters.source);
    if (filters.assignedCounselor) result = result.filter(f => f.assignedCounselor === filters.assignedCounselor);
    if (filters.date) {
      result = result.filter(f => {
        const rawDateStr = f.scheduledDate || f.createdAt;
        if (!rawDateStr) return false;
        const fDateStr = typeof rawDateStr === 'string' ? rawDateStr.split('T')[0].split(' ')[0] : rawDateStr;
        return fDateStr === filters.date;
      });
    }

    // D. Sorting
    result.sort((a, b) => {
      const dateAStr = `${a.scheduledDate || "9999-12-31"}T${a.scheduledTime || "00:00"}`;
      const dateBStr = `${b.scheduledDate || "9999-12-31"}T${b.scheduledTime || "00:00"}`;
      
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

  const parseFollowupDate = (dateStr) => {
    if (!dateStr) return null;
    let dStr = typeof dateStr === 'string' ? dateStr.split('T')[0].split(' ')[0] : dateStr;
    if (typeof dStr === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(dStr)) {
      const [dd, mm, yyyy] = dStr.split('-');
      dStr = `${yyyy}-${mm}-${dd}`;
    }
    
    // Robust local timezone parsing: "YYYY-MM-DD"
    const [year, month, day] = dStr.split('-');
    const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    
    if (!isNaN(d.getTime())) {
      d.setHours(0, 0, 0, 0);
      return d;
    }
    return null;
  };

  // 4. Summaries & Tab Distributions
  const { summaryCards, tabCounts, workSummary } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    let tCount = 0;
    let oCount = 0;
    let uCount = 0;
    let cCount = 0;
    let totalPending = 0;

    console.log("========== FOLLOWUP DIAGNOSTICS ==========");
    console.log("Current Date (midnight):", today, todayTime);

    filteredFollowups.forEach(f => {
      const rawDateStr = f.scheduledDate || f.createdAt;
      const fDate = parseFollowupDate(rawDateStr);
      
      const isCompleted = String(f.status || "").toLowerCase() === "completed";

      let bucket = "none";
      let reason = "";

      if (isCompleted) {
        cCount++;
        bucket = "Completed";
        reason = `Status is completed (status=${f.status}, leadStatus=${f.leadStatus})`;
      } else if (!fDate) {
        // Fallback if no valid date
        totalPending++;
        uCount++;
        bucket = "Upcoming (Fallback)";
        reason = `No valid date found (rawDateStr=${rawDateStr})`;
      } else {
        totalPending++;
        const fTime = fDate.getTime();
        if (fTime < todayTime) {
          oCount++;
          bucket = "Missed/Overdue";
          reason = `fTime (${fTime}) < todayTime (${todayTime})`;
        } else if (fTime === todayTime) {
          tCount++;
          bucket = "Today";
          reason = `fTime (${fTime}) === todayTime (${todayTime})`;
        } else {
          uCount++;
          bucket = "Upcoming";
          reason = `fTime (${fTime}) > todayTime (${todayTime})`;
        }
      }

      console.log(`[Followup ID: ${f.id || f.followupId}]`);
      console.log(`  - scheduledDate: ${rawDateStr}`);
      console.log(`  - parsed Date:`, fDate);
      console.log(`  - status: ${f.status} | leadStatus: ${f.leadStatus}`);
      console.log(`  - Assigned Bucket: ${bucket}`);
      console.log(`  - Reason: ${reason}`);
    });
    console.log("==========================================");

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
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    let result = [];

    if (viewMode === "calendar" && selectedCalendarDay) {
      result = filteredFollowups.filter(f => {
        const rawDateStr = f.scheduledDate || f.createdAt;
        const fDate = parseFollowupDate(rawDateStr);
        if (!fDate) return false;
        
        const isCompleted = String(f.status || "").toLowerCase() === "completed";
        if (isCompleted) return false;

        // selectedCalendarDay is usually YYYY-MM-DD
        const calDate = new Date(selectedCalendarDay);
        calDate.setHours(0, 0, 0, 0);
        return fDate.getTime() === calDate.getTime();
      });
    } else if (activeTab === "all") {
      result = filteredFollowups;
    } else {
      result = filteredFollowups.filter(f => {
        const rawDateStr = f.scheduledDate || f.createdAt;
        const fDate = parseFollowupDate(rawDateStr);
        
        const isCompleted = String(f.status || "").toLowerCase() === "completed";

        switch (activeTab) {
          case "today": 
            return fDate && fDate.getTime() === todayTime && !isCompleted;
          case "upcoming": 
            return (!fDate || fDate.getTime() > todayTime) && !isCompleted;
          case "overdue": 
            return fDate && fDate.getTime() < todayTime && !isCompleted;
          case "completed": 
            return isCompleted;
          default: 
            return true;
        }
      });
    }

    return result;
  }, [filteredFollowups, activeTab, viewMode, selectedCalendarDay]);

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
