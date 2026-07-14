"use client";

export default function ManagementTabs({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
  {
    key: "leads",
    label: "Leads",
    count: 112,
  },
  {
    key: "users",
    label: "User Directory",
    count: 5,
  },
  {
    key: "calls",
    label: "Call Reports",
    count: 60,
  },
];
  

  return (
    <div className="flex gap-8 border-b border-gray-200">

      {tabs.map((tab) => (

        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === tab.key
              ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <div className="flex items-center gap-2">

    <span>{tab.label}</span>

    <span
        className="
        rounded-full
        bg-gray-100
        px-2
        py-0.5
        text-xs
        text-gray-500
        "
    >
        {tab.count}
    </span>

</div>
        </button>

      ))}

    </div>
  );
}