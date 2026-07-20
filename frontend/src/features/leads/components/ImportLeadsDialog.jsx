"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useImportLeads } from "../hooks/useImportLeads";

export default function ImportLeadsDialog({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const { mutate, isPending } = useImportLeads(() => {
    handleClose();
  });

  const handleFileChange = (e) => {
    setError("");
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }

    if (selected.type !== "text/csv" && !selected.name.endsWith(".csv")) {
      setError("Please select a valid CSV file.");
      setFile(null);
      return;
    }

    // 5MB limit
    if (selected.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB size limit.");
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleImport = () => {
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const payload = new FormData();
    payload.append("csv_file", file);

    mutate({
      payload,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || file.size)
        );
        setProgress(percentCompleted);
      },
    });
  };

  const handleClose = () => {
    setFile(null);
    setError("");
    setProgress(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Import Leads"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            loading={isPending}
            loadingText={`Uploading ${progress}%...`}
            disabled={!file}
          >
            Import CSV
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Please upload a CSV file with the following column order:<br/>
          <code className="bg-gray-100 p-1 rounded">source, name, mobile_no, email, college_studied, state, district, taluk</code>
        </p>

        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
          >
            Click to browse
          </label>
          <p className="text-sm text-gray-500 mt-2">Maximum file size: 5MB</p>

          {file && (
            <p className="mt-4 text-green-600 font-medium">Selected: {file.name}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        {isPending && progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </Modal>
  );
}
