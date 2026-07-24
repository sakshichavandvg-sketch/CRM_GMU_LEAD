import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({ title = "Failed to load data", message = "There was a problem retrieving the dashboard data.", onRetry }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/50 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
        <AlertCircle className="text-red-600" size={28} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mb-6">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
}
