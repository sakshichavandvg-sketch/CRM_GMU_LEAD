/**
 * Outcome color mapping for call results.
 */
export const OUTCOME_COLORS = {
  connected: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  busy: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  "no response": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  no_response: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  "no answer": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  cancelled: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400" },
  failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
};

/**
 * Returns Tailwind classes for a given outcome string.
 */
export function getOutcomeStyle(outcome) {
  const key = (outcome || "").toLowerCase();
  return OUTCOME_COLORS[key] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400" };
}

/**
 * Formats duration in seconds to a human-readable string.
 */
export function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/**
 * Formats a date string into a user-friendly relative label.
 */
export function formatCallDate(dateStr) {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  if (date >= todayStart) return `Today, ${time}`;
  if (date >= yesterdayStart) return `Yesterday, ${time}`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + `, ${time}`;
}

/**
 * Formats a date string to just the time (e.g., "10:42 AM").
 */
export function formatTime(dateStr) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

/**
 * Groups calls into timeline buckets (Today, Yesterday, This Week, Older).
 */
export function groupCallsByTimeline(calls) {
  if (!calls || calls.length === 0) return [];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const groups = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    Older: [],
  };

  const sorted = [...calls].sort((a, b) => {
    const dateA = new Date(a.callDateTime || a.createdAt || a.date);
    const dateB = new Date(b.callDateTime || b.createdAt || b.date);
    return dateB - dateA;
  });

  sorted.forEach((call) => {
    const callDate = new Date(call.callDateTime || call.createdAt || call.date);
    if (callDate >= todayStart) groups.Today.push(call);
    else if (callDate >= yesterdayStart) groups.Yesterday.push(call);
    else if (callDate >= weekStart) groups["This Week"].push(call);
    else groups.Older.push(call);
  });

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

/**
 * Gets direction label from call data.
 */
export function getCallDirection(call) {
  const dir = (call.callDirection || call.direction || "outbound").toLowerCase();
  return dir === "inbound" ? "Inbound" : "Outbound";
}

/**
 * Generates initials from a name.
 */
export function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}
