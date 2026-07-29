"use client";

import { FileText, Upload } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LeadDocumentsTab({ data }) {
  // Graceful empty state for documents
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500 bg-gray-50/50 rounded-xl border border-gray-100 border-dashed p-8">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No documents uploaded</h3>
      <p className="text-sm text-center max-w-md mb-6">
        There are currently no documents attached to this lead profile. You can upload relevant files like applications, IDs, or receipts here.
      </p>
      
      <Button 
        variant="outline" 
        icon={<Upload size={16} />}
        onClick={() => console.log("Upload document placeholder")}
      >
        Upload Document
      </Button>
    </div>
  );
}
