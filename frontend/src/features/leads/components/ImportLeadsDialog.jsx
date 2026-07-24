"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useImportLeads } from "../hooks/useImportLeads";
import { 
  MapPin, 
  User, 
  Smartphone, 
  Mail, 
  GraduationCap, 
  Map, 
  MapPinned, 
  FileText, 
  X,
  CheckCircle2,
  AlertCircle 
} from "lucide-react";
import UploadIllustration from "@/components/illustrations/UploadIllustration";

const REQUIRED_COLUMNS = [
  { label: "Source", icon: MapPin },
  { label: "Name", icon: User },
  { label: "Mobile", icon: Smartphone },
  { label: "Email", icon: Mail },
  { label: "College", icon: GraduationCap },
  { label: "State", icon: Map },
  { label: "District", icon: MapPinned },
  { label: "Taluk", icon: MapPin },
];

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

export default function ImportLeadsDialog({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoAssign, setAutoAssign] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error
  const [rowCount, setRowCount] = useState(null);
  
  const fileInputRef = useRef(null);

  const { mutate } = useImportLeads(() => {
    setStatus("success");
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setFile(null);
      setError("");
      setProgress(0);
      setIsDragging(false);
      setAutoAssign(false);
      setStatus("idle");
      setRowCount(null);
    }
  }, [open]);

  const processFile = async (selected) => {
    setError("");
    setStatus("idle");
    if (!selected) {
      setFile(null);
      setRowCount(null);
      return;
    }

    if (selected.type !== "text/csv" && !selected.name.endsWith(".csv")) {
      setError("Invalid file format. Please upload a CSV file.");
      setFile(null);
      setRowCount(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File exceeds the maximum size limit of 5 MB.");
      setFile(null);
      setRowCount(null);
      return;
    }

    setFile(selected);
    
    // Quick parse for row count
    try {
      const text = await selected.text();
      const lines = text.split("\n").filter(line => line.trim().length > 0);
      setRowCount(lines.length > 1 ? lines.length - 1 : 0);
    } catch (e) {
      setRowCount(null);
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (status === "uploading") return;
    const droppedFile = e.dataTransfer.files?.[0];
    processFile(droppedFile);
  };

  const handleImport = () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(0);
    setError("");

    const payload = new FormData();
    payload.append("csv_file", file);
    if (autoAssign) {
      payload.append("autoAssign", true);
    }

    mutate(
      {
        payload,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || file.size)
          );
          setProgress(percentCompleted);
        },
      },
      {
        onError: () => {
          setStatus("error");
        }
      }
    );
  };

  // Status mapping
  const renderStatus = () => {
    if (status === "success") {
      return (
        <div className="flex flex-col items-center justify-center py-10 bg-green-50 rounded-xl border border-green-200">
          <CheckCircle2 size={48} className="text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Import Successful</h3>
          <p className="text-gray-600 font-medium">
            {rowCount !== null ? `${rowCount} Leads Imported Successfully` : "Leads Imported Successfully"}
          </p>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="flex flex-col items-center justify-center py-10 bg-red-50 rounded-xl border border-red-200">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Invalid CSV Format</h3>
          <p className="text-gray-600 mb-6 text-center max-w-sm">
            Failed to import leads. Please check your file and try again.
          </p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Try Again
          </Button>
        </div>
      );
    }

    if (status === "uploading") {
      return (
        <div className="flex flex-col items-center justify-center py-12 border border-blue-100 rounded-xl bg-sky-50">
          <UploadIllustration state="uploading" className="mb-6 w-24 h-24" />
          <div className="w-64 max-w-full relative px-4">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#6F1D28] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }

    // Default: Idle or File Error state
    return (
      <div className="space-y-6">
        {/* Required CSV Columns */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Required CSV Columns</h3>
          <div className="flex flex-wrap gap-2">
            {REQUIRED_COLUMNS.map((col, idx) => {
              const IconComponent = col.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                >
                  <IconComponent size={14} className="text-gray-400" />
                  {col.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag & Drop Area */}
        {!file && (
          <div
            className={`
              mt-2 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer
              ${isDragging 
                ? "border-[#6F1D28] bg-blue-100 shadow-sm scale-[1.02]" 
                : "border-blue-200 hover:border-[#6F1D28] bg-sky-50"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIllustration 
              state={isDragging ? "dragging" : "idle"} 
              className="mb-4 w-28 h-28" 
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-1 mt-2">Drag & Drop CSV File Here</h3>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button variant="outline" className="mb-6 pointer-events-none bg-white">Browse Computer</Button>
            <p className="text-xs text-gray-500 font-medium">
              Maximum Size: 5 MB &bull; CSV Only
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* File Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Selected File Summary */}
        {file && (
          <div className="flex items-center justify-between p-4 border border-blue-100 rounded-xl bg-sky-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-gray-200 text-[#6F1D28]">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs font-medium text-gray-500">
                  <span>{formatSize(file.size)}</span>
                  {rowCount !== null && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>{rowCount} Rows Detected</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setRowCount(null);
                setError("");
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove file"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Auto Assign Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={autoAssign}
                onChange={(e) => setAutoAssign(e.target.checked)}
                className="w-4 h-4 text-[#6F1D28] bg-white border-gray-300 rounded focus:ring-[#6F1D28] focus:ring-2 accent-[#6F1D28] cursor-pointer"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#6F1D28] transition-colors">
                Automatically assign imported leads
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Distribute imported leads equally among all active telecallers using Round Robin assignment.
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Import Leads"
      footer={
        (status === "idle" || status === "error") ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || status === "error"}
            >
              Import Leads
            </Button>
          </>
        ) : (status === "success" ? (
          <Button onClick={onClose}>
            Done
          </Button>
        ) : null)
      }
    >
      <div className="mb-6 text-sm text-gray-500">
        Upload a CSV file to import student leads into the CRM.
      </div>
      
      {renderStatus()}
    </Modal>
  );
}
