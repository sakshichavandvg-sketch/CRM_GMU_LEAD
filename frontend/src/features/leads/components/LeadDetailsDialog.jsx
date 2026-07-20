"use client";

import Modal from "@/components/ui/Modal";
import ErrorState from "@/components/ui/ErrorState";
import { FormSkeleton } from "@/components/ui/Skeletons";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { useLeadDetails } from "../hooks/useLeadDetails";

export default function LeadDetailsDialog({ open, onClose, enquiryNo }) {
  const { data, isLoading, isError, error } = useLeadDetails(
    open ? enquiryNo : null
  );

  return (
    <Modal open={open} onClose={onClose} title="Lead Details" size="lg">
      {isLoading && <FormSkeleton />}
      
      {isError && (
        <ErrorState
          title="Error Loading Lead Details"
          message={error?.response?.data?.message || "Failed to load lead details."}
          onRetry={() => {}} // Could wire a refetch here
        />
      )}
      
      {data && !isLoading && !isError && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Profile Info</h3>
              <p><span className="text-gray-500">Name:</span> {data.name}</p>
              <p><span className="text-gray-500">Mobile:</span> {data.mobileNo}</p>
              {data.email && <p><span className="text-gray-500">Email:</span> {data.email}</p>}
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
              <p><span className="text-gray-500">State:</span> {data.state}</p>
              <p><span className="text-gray-500">District:</span> {data.district}</p>
              <p><span className="text-gray-500">Taluk:</span> {data.taluk}</p>
            </div>
            
            <div className="p-4 rounded-lg border bg-gray-50 md:col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">Academic & Source Info</h3>
              <div className="grid grid-cols-2 gap-2">
                {data.collegeStudied && <p><span className="text-gray-500">College:</span> {data.collegeStudied}</p>}
                {data.programme && <p><span className="text-gray-500">Programme:</span> {data.programme}</p>}
                {data.course && <p><span className="text-gray-500">Course:</span> {data.course}</p>}
                {data.discipline && <p><span className="text-gray-500">Discipline:</span> {data.discipline}</p>}
                {data.source && <p><span className="text-gray-500">Source:</span> {data.source}</p>}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Status & Remarks</h3>
            <div className="p-4 rounded-lg border bg-white shadow-sm space-y-2">
              <p><span className="font-medium text-gray-600">Status:</span> {data.status || 'N/A'}</p>
              <p><span className="font-medium text-gray-600">Opinion:</span> {data.opinion || 'N/A'}</p>
              <p><span className="font-medium text-gray-600">Remarks:</span> {data.remarks || 'No remarks available.'}</p>
            </div>
          </div>
          
          <div>
             <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity & Timeline</h3>
             {/* The existing ActivityTimeline might not accept props or might need adjustments based on actual data. Assuming it takes some timeline data. */}
             <ActivityTimeline activities={data.activities || []} />
          </div>
        </div>
      )}
    </Modal>
  );
}
