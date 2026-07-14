export default function LeadTemperature() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">

      <div
        className="
          rounded-2xl
          border
          border-orange-200
          bg-white
          p-6
        "
      >
        <h2 className="text-4xl font-bold">
          46
        </h2>

        <p className="mt-2 text-lg font-semibold text-orange-500">
          🔥 Hot Leads
        </p>

        <p className="text-gray-500">
          Score ≥ 75
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-blue-200
          bg-white
          p-6
        "
      >
        <h2 className="text-4xl font-bold">
          66
        </h2>

        <p className="mt-2 text-lg font-semibold text-blue-500">
          ❄ Cold Leads
        </p>

        <p className="text-gray-500">
          Score &lt; 75
        </p>
      </div>

    </div>
  );
}