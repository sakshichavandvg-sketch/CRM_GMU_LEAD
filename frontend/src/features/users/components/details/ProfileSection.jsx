"use client";

export default function ProfileSection({ profile }) {
  if (!profile) return null;

  const details = [
    { label: "Employee ID", value: profile.empId },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Department", value: profile.department },
    { label: "Reporting Manager", value: profile.reportingManager },
    { label: "Role", value: profile.role },
    { label: "Joining Date", value: profile.joiningDate },
    {
      label: "Status",
      value: profile.status === "active" ? "Active" : "Inactive",
      isBadge: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Profile Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {details.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">{item.label}</span>
            {item.isBadge ? (
              <div className="flex items-center mt-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    profile.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ) : (
              <span className="text-base font-medium text-gray-900">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
